import { Router, Request, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../index';

const router = Router();

// Department Categories CRUD
router.get('/', async (req: Request, res: Response) => {
    try {
        const categories = await prisma.departmentCategory.findMany({
            orderBy: { order: 'asc' }
        });
        res.json({ categories });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch department categories.' });
    }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const category = await prisma.departmentCategory.findUnique({
            where: { id: req.params.id }
        });
        if (!category) return res.status(404).json({ error: 'Category not found.' });
        res.json({ category });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch category.' });
    }
});

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const { name, slug, description, image, icon, gradient, order, isActive } = req.body;
        const category = await prisma.departmentCategory.create({
            data: {
                name, slug, description, image, icon, gradient,
                order: parseInt(order as any) || 0,
                isActive: isActive !== false
            }
        });
        res.status(201).json({ category });
    } catch (error) {
        console.error('Create category error:', error);
        res.status(500).json({ error: 'Failed to create department category.' });
    }
});

router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const { name, slug, description, image, icon, gradient, order, isActive } = req.body;
        const category = await prisma.departmentCategory.update({
            where: { id: req.params.id },
            data: {
                name, slug, description, image, icon, gradient,
                order: parseInt(order as any) || 0,
                isActive: isActive !== false
            }
        });
        res.json({ category });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update department category.' });
    }
});

router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        await prisma.departmentCategory.delete({ where: { id: req.params.id } });
        res.json({ message: 'Category deleted.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete department category.' });
    }
});

export default router;
