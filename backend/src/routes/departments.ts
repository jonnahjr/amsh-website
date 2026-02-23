import { Router, Request, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../index';

const router = Router();

// Departments
router.get('/', async (req: Request, res: Response) => {
    try {
        const departments = await prisma.department.findMany({ where: { isActive: true }, orderBy: { order: 'asc' }, include: { services: { where: { isActive: true } }, doctors: { where: { isActive: true }, select: { id: true, name: true, title: true, specialty: true, image: true } } } });
        res.json({ departments });
    } catch (error) { res.status(500).json({ error: 'Failed to fetch departments.' }); }
});

router.get('/:slug', async (req: Request, res: Response) => {
    try {
        const dept = await prisma.department.findUnique({ where: { slug: req.params.slug }, include: { services: true, doctors: true } });
        if (!dept) return res.status(404).json({ error: 'Department not found.' });
        res.json({ department: dept });
    } catch (error) { res.status(500).json({ error: 'Failed to fetch department.' }); }
});

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const dept = await prisma.department.create({ data: req.body });
        res.status(201).json({ department: dept });
    } catch (error) { res.status(500).json({ error: 'Failed to create department.' }); }
});

router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const dept = await prisma.department.update({ where: { id: req.params.id }, data: req.body });
        res.json({ department: dept });
    } catch (error) { res.status(500).json({ error: 'Failed to update department.' }); }
});

router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        await prisma.department.delete({ where: { id: req.params.id } });
        res.json({ message: 'Department deleted.' });
    } catch (error) { res.status(500).json({ error: 'Failed to delete department.' }); }
});

export default router;
