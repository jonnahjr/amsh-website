import { Router, Request, Response } from 'express';
import { prisma } from '../index';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const showAll = req.query.all === 'true';
        const where = showAll ? {} : { isActive: true };
        const testimonials = await prisma.testimonial.findMany({
            where,
            orderBy: { order: 'asc' }
        });
        res.json({ testimonials });
    } catch (error) { res.status(500).json({ error: 'Failed to fetch testimonials.' }); }
});

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const t = await prisma.testimonial.create({ data: req.body });
        res.status(201).json({ testimonial: t });
    } catch (error) { res.status(500).json({ error: 'Failed to create testimonial.' }); }
});

router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const t = await prisma.testimonial.update({ where: { id: req.params.id }, data: req.body });
        res.json({ testimonial: t });
    } catch (error) { res.status(500).json({ error: 'Failed to update testimonial.' }); }
});

router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        await prisma.testimonial.delete({ where: { id: req.params.id } });
        res.json({ message: 'Testimonial deleted.' });
    } catch (error) { res.status(500).json({ error: 'Failed to delete testimonial.' }); }
});

export default router;
