import { Router, Request, Response } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../index';
import path from 'path';

const router = Router();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf', 'video/mp4', 'audio/mpeg'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only images, PDFs, videos, and audio are allowed.'));
        }
    },
});

const getMediaType = (mimeType: string): 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'AUDIO' => {
    if (mimeType.startsWith('image/')) return 'IMAGE';
    if (mimeType.startsWith('video/')) return 'VIDEO';
    if (mimeType.startsWith('audio/')) return 'AUDIO';
    return 'DOCUMENT';
};

// GET /api/media
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const { type, folder, page = '1' } = req.query;
        const skip = (parseInt(page as string) - 1) * 20;
        const where: any = {};
        if (type) where.type = type;
        if (folder) where.folder = folder;
        const [media, total] = await Promise.all([
            prisma.media.findMany({ where, skip, take: 20, orderBy: { createdAt: 'desc' } }),
            prisma.media.count({ where }),
        ]);
        res.json({ media, total, pages: Math.ceil(total / 20) });
    } catch (error) { res.status(500).json({ error: 'Failed to fetch media.' }); }
});

// POST /api/media/upload
router.post('/upload', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'EDITOR'), upload.single('file'), async (req: AuthRequest, res: Response) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file provided.' });

        const { folder = 'amsh' } = req.body;
        const fileBuffer = req.file.buffer.toString('base64');
        const dataUri = `data:${req.file.mimetype};base64,${fileBuffer}`;

        let uploadResult: any;
        if (req.file.mimetype.startsWith('image/')) {
            uploadResult = await cloudinary.uploader.upload(dataUri, { folder, resource_type: 'image', quality: 'auto', fetch_format: 'auto' });
        } else if (req.file.mimetype.startsWith('video/')) {
            uploadResult = await cloudinary.uploader.upload(dataUri, { folder, resource_type: 'video' });
        } else {
            uploadResult = await cloudinary.uploader.upload(dataUri, { folder, resource_type: 'raw' });
        }

        const media = await prisma.media.create({
            data: {
                filename: uploadResult.public_id,
                originalName: req.file.originalname,
                url: uploadResult.secure_url,
                publicId: uploadResult.public_id,
                type: getMediaType(req.file.mimetype),
                mimeType: req.file.mimetype,
                size: req.file.size,
                width: uploadResult.width,
                height: uploadResult.height,
                folder,
            },
        });

        res.status(201).json({ media });
    } catch (error: any) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Failed to upload file.' });
    }
});

// DELETE /api/media/:id
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const media = await prisma.media.findUnique({ where: { id: req.params.id } });
        if (!media) return res.status(404).json({ error: 'Media not found.' });

        if (media.publicId) {
            const resourceType = media.type === 'IMAGE' ? 'image' : media.type === 'VIDEO' ? 'video' : 'raw';
            await cloudinary.uploader.destroy(media.publicId, { resource_type: resourceType });
        }

        await prisma.media.delete({ where: { id: req.params.id } });
        res.json({ message: 'Media deleted.' });
    } catch (error) { res.status(500).json({ error: 'Failed to delete media.' }); }
});

export default router;
