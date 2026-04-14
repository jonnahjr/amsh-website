import { Response, Router } from 'express';
import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { prisma } from '../core/db/prisma.service';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

import { getUploadBaseDir } from '../core/utils/storage';

const router = Router();

// Priority: project-root/uploads (Persistent) -> backend/storage/uploads -> backend/public/uploads
const uploadBaseDir = getUploadBaseDir();

// Configure Multer for local storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = (req.body?.folder || 's4').toString();
        const uploadDir = path.join(uploadBaseDir, folder);
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
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
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB (was 10MB)
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
        const { type, folder, page = '1', search } = req.query;
        const pageSize = 50; // Increased page size
        const skip = (parseInt(page as string) - 1) * pageSize;
        
        const where: any = {};
        if (type) where.type = type;
        if (folder) where.folder = folder;
        if (search) {
            where.OR = [
                { filename: { contains: search as string } },
                { originalName: { contains: search as string } }
            ];
        }

        const [media, total] = await Promise.all([
            prisma.media.findMany({ 
                where, 
                skip, 
                take: pageSize, 
                orderBy: { createdAt: 'desc' } 
            }),
            prisma.media.count({ where }),
        ]);
        
        res.json({ 
            media, 
            total, 
            pages: Math.ceil(total / pageSize),
            currentPage: parseInt(page as string)
        });
    } catch (error) { 
        console.error('Media fetch error:', error);
        res.status(500).json({ error: 'Failed to fetch media assets.' }); 
    }
});

// POST /api/media/upload
router.post('/upload', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'EDITOR'), upload.single('file'), async (req: AuthRequest, res: Response) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'No file provided.' });

        const folder = (req.body?.folder || 's4').toString();
        const relativeUrl = `/uploads/${folder}/${req.file.filename}`;
        
        console.log(`✅ [AMSH MEDIA] Upload Success: folder=${folder} | file=${req.file.filename}`);
        console.log(`📍 [AMSH MEDIA] Saved to: ${req.file.path}`);
        console.log(`🔗 [AMSH MEDIA] Relative URL: ${relativeUrl}`);

        const media = await prisma.media.create({
            data: {
                filename: req.file.filename,
                originalName: req.file.originalname,
                url: relativeUrl,
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
        console.error('❌ AMSH Media Upload Error:', error?.message || error);
        res.status(500).json({ 
            error: 'Failed to upload file.', 
            detail: error?.message,
            hint: 'Verify backend/storage/uploads exists and is writable (chmod 775).'
        });
    }
});

// DELETE /api/media/:id
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const media = await prisma.media.findUnique({ where: { id: req.params.id } });
        if (!media) return res.status(404).json({ error: 'Media not found.' });

        // Delete from local filesystem
        if (media.filename) {
            const filePath = path.join(uploadBaseDir, media.folder || 's4', media.filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await prisma.media.delete({ where: { id: req.params.id } });
        res.json({ message: 'Media deleted.' });
    } catch (error) { res.status(500).json({ error: 'Failed to delete media.' }); }
});

export default router;
