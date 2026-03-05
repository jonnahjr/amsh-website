import { Router, Request, Response } from 'express';
import multer from 'multer';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../index';
import path from 'path';
import fs from 'fs';

const router = Router();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer for local storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

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

        // Generate local URL
        const backendUrl = process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`;
        const secureUrl = `${backendUrl}/uploads/${req.file.filename}`;

        const media = await prisma.media.create({
            data: {
                filename: req.file.filename,
                originalName: req.file.originalname,
                url: secureUrl,
                publicId: req.file.filename,
                type: getMediaType(req.file.mimetype),
                mimeType: req.file.mimetype,
                size: req.file.size,
                width: 0, // Not dynamically extracting dimensions yet for local
                height: 0,
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

        // Delete from local filesystem
        if (media.filename) {
            const filePath = path.join(uploadDir, media.filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await prisma.media.delete({ where: { id: req.params.id } });
        res.json({ message: 'Media deleted.' });
    } catch (error) { res.status(500).json({ error: 'Failed to delete media.' }); }
});

export default router;
