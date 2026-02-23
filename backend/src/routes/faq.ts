import { Router, Request, Response } from 'express';
import { prisma } from '../index';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const faqs = await prisma.fAQ.findMany({ where: { isActive: true }, orderBy: { order: 'asc' } });
        res.json({ faqs });
    } catch (error) { res.status(500).json({ error: 'Failed to fetch FAQs.' }); }
});

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const faq = await prisma.fAQ.create({ data: req.body });
        res.status(201).json({ faq });
    } catch (error) { res.status(500).json({ error: 'Failed to create FAQ.' }); }
});

router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const faq = await prisma.fAQ.update({ where: { id: req.params.id }, data: req.body });
        res.json({ faq });
    } catch (error) { res.status(500).json({ error: 'Failed to update FAQ.' }); }
});

router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        await prisma.fAQ.delete({ where: { id: req.params.id } });
        res.json({ message: 'FAQ deleted.' });
    } catch (error) { res.status(500).json({ error: 'Failed to delete FAQ.' }); }
});

export default router;
