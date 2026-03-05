import { Router, Request, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../index';

const router = Router();

// Service Categories CRUD
router.get('/', async (req: Request, res: Response) => {
    try {
        const categories = await prisma.serviceCategory.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' }
        });
        res.json({ categories });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch service categories.' });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const category = await prisma.serviceCategory.findUnique({
            where: { id: req.params.id }
        });
        if (!category) return res.status(404).json({ error: 'Category not found.' });
        res.json({ category });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch category.' });
    }
});

router.get('/slug/:slug', async (req: Request, res: Response) => {
    try {
        const category = await prisma.serviceCategory.findUnique({
            where: { slug: req.params.slug }
        });
        if (!category) return res.status(404).json({ error: 'Category not found.' });
        res.json({ category });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch category.' });
    }
});

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const { name, slug, description, image, icon, gradient, accentColor, order, isActive, deptSlugs } = req.body;
        const category = await prisma.serviceCategory.create({
            data: {
                name, slug, description, image, icon, gradient, accentColor,
                order: parseInt(order as any) || 0,
                isActive: isActive !== false,
                deptSlugs
            }
        });
        res.status(201).json({ category });
    } catch (error) {
        console.error('Create category error:', error);
        res.status(500).json({ error: 'Failed to create service category.' });
    }
});

router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const { name, slug, description, image, icon, gradient, accentColor, order, isActive, deptSlugs } = req.body;
        const category = await prisma.serviceCategory.update({
            where: { id: req.params.id },
            data: {
                name, slug, description, image, icon, gradient, accentColor,
                order: parseInt(order as any) || 0,
                isActive: isActive !== false,
                deptSlugs
            }
        });
        res.json({ category });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update service category.' });
    }
});

router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        await prisma.serviceCategory.delete({ where: { id: req.params.id } });
        res.json({ message: 'Category deleted.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete service category.' });
    }
});

export default router;
