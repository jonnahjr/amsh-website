import { Router, Request, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../index';

const router = Router();

// Pages CRUD
router.get('/', async (req: Request, res: Response) => {
    try {
        const { status } = req.query;
        const where: any = status ? { status } : { status: 'PUBLISHED' };
        const pages = await prisma.page.findMany({ where, orderBy: { order: 'asc' } });
        res.json({ pages });
    } catch (error) { res.status(500).json({ error: 'Failed to fetch pages.' }); }
});

router.get('/:slug', async (req: Request, res: Response) => {
    try {
        const page = await prisma.page.findUnique({ where: { slug: req.params.slug } });
        if (!page) return res.status(404).json({ error: 'Page not found.' });
        res.json({ page });
    } catch (error) { res.status(500).json({ error: 'Failed to fetch page.' }); }
});

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const page = await prisma.page.create({ data: req.body });
        res.status(201).json({ page });
    } catch (error) { res.status(500).json({ error: 'Failed to create page.' }); }
});

router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const page = await prisma.page.update({ where: { id: req.params.id }, data: req.body });
        res.json({ page });
    } catch (error) { res.status(500).json({ error: 'Failed to update page.' }); }
});

router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        await prisma.page.delete({ where: { id: req.params.id } });
        res.json({ message: 'Page deleted.' });
    } catch (error) { res.status(500).json({ error: 'Failed to delete page.' }); }
});

export default router;
