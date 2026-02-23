import { Router, Request, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../index';

const router = Router();

// GET /api/research - Public
router.get('/', async (req: Request, res: Response) => {
    try {
        const { category, status = 'PUBLISHED', page = '1', limit = '10', search } = req.query;
        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
        const where: any = { status };
        if (category) where.category = category;
        if (search) {
            where.OR = [
                { title: { contains: search as string, mode: 'insensitive' } },
                { abstract: { contains: search as string, mode: 'insensitive' } },
            ];
        }

        const [research, total] = await Promise.all([
            prisma.research.findMany({ where, skip, take: parseInt(limit as string), orderBy: { publishedAt: 'desc' } }),
            prisma.research.count({ where }),
        ]);

        res.json({ research, pagination: { total, page: parseInt(page as string), pages: Math.ceil(total / parseInt(limit as string)) } });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch research.' });
    }
});

// GET /api/research/:id
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const item = await prisma.research.findUnique({ where: { id: req.params.id } });
        if (!item) return res.status(404).json({ error: 'Research not found.' });
        await prisma.research.update({ where: { id: item.id }, data: { views: { increment: 1 } } });
        res.json({ research: item });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch research.' });
    }
});

// POST /api/research - Submit research (Public)
router.post('/', async (req: Request, res: Response) => {
    try {
        const { title, abstract, authors, keywords, category, document, journal, doi } = req.body;
        const item = await prisma.research.create({
            data: { title, abstract, authors: authors || [], keywords: keywords || [], category, document, journal, doi, status: 'PENDING' },
        });
        res.status(201).json({ message: 'Research submitted for review.', research: item });
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit research.' });
    }
});

// PATCH /api/research/:id/status - Admin approve/reject
router.patch('/:id/status', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const { status } = req.body;
        const item = await prisma.research.update({
            where: { id: req.params.id },
            data: { status, publishedAt: status === 'PUBLISHED' ? new Date() : undefined },
        });
        res.json({ research: item });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update research status.' });
    }
});

// GET /api/research/admin/all - Admin view all
router.get('/admin/all', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const research = await prisma.research.findMany({ orderBy: { createdAt: 'desc' } });
        res.json({ research });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch research.' });
    }
});

export default router;
