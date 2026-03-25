import { Router, Request, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../index';

const router = Router();

// Services CRUD
router.get('/', async (req: Request, res: Response) => {
    try {
        const services = await prisma.service.findMany({ where: { isActive: true }, orderBy: { order: 'asc' }, include: { department: { select: { name: true, slug: true } } } });
        res.json({ services });
    } catch (error) { res.status(500).json({ error: 'Failed to fetch services.' }); }
});

router.get('/:slug', async (req: Request, res: Response) => {
    try {
        const service = await prisma.service.findUnique({ where: { slug: req.params.slug }, include: { department: true } });
        if (!service) return res.status(404).json({ error: 'Service not found.' });
        res.json({ service });
    } catch (error) { res.status(500).json({ error: 'Failed to fetch service.' }); }
});

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const { name, slug, description, content, image, icon, departmentId, headName, headTitle, headProfession, headImage, vision, mission, goal, highlights, order, isActive, gallery } = req.body;
        const service = await prisma.service.create({
            data: {
                name, slug, description, content, image, icon, departmentId,
                headName, headTitle, headProfession, headImage,
                vision, mission, goal, highlights,
                order: parseInt(order as any) || 0,
                isActive: isActive !== false,
                gallery
            }
        });
        res.status(201).json({ service });
    } catch (error) { res.status(500).json({ error: 'Failed to create service.' }); }
});

router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const { name, slug, description, content, image, icon, departmentId, headName, headTitle, headProfession, headImage, vision, mission, goal, highlights, order, isActive, gallery } = req.body;
        const service = await prisma.service.update({
            where: { id: req.params.id },
            data: {
                name, slug, description, content, image, icon, departmentId,
                headName, headTitle, headProfession, headImage,
                vision, mission, goal, highlights,
                order: parseInt(order as any) || 0,
                isActive: isActive !== false,
                gallery
            }
        });
        res.json({ service });
    } catch (error) { res.status(500).json({ error: 'Failed to update service.' }); }
});

router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        await prisma.service.delete({ where: { id: req.params.id } });
        res.json({ message: 'Service deleted.' });
    } catch (error) { res.status(500).json({ error: 'Failed to delete service.' }); }
});

export default router;
