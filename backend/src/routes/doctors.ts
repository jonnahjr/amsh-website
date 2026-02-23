import { Router, Request, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../index';

const router = Router();

// Doctors
router.get('/', async (req: Request, res: Response) => {
    try {
        const { department, isLeadership } = req.query;
        const where: any = { isActive: true };
        if (department) where.departmentId = department;
        if (isLeadership !== undefined) where.isLeadership = isLeadership === 'true';
        const doctors = await prisma.doctor.findMany({ where, orderBy: { order: 'asc' }, include: { department: { select: { name: true } } } });
        res.json({ doctors });
    } catch (error) { res.status(500).json({ error: 'Failed to fetch doctors.' }); }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const doctor = await prisma.doctor.findUnique({ where: { id: req.params.id }, include: { department: true } });
        if (!doctor) return res.status(404).json({ error: 'Doctor not found.' });
        res.json({ doctor });
    } catch (error) { res.status(500).json({ error: 'Failed to fetch doctor.' }); }
});

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const doctor = await prisma.doctor.create({ data: req.body });
        res.status(201).json({ doctor });
    } catch (error) { res.status(500).json({ error: 'Failed to create doctor.' }); }
});

router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const doctor = await prisma.doctor.update({ where: { id: req.params.id }, data: req.body });
        res.json({ doctor });
    } catch (error) { res.status(500).json({ error: 'Failed to update doctor.' }); }
});

router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        await prisma.doctor.delete({ where: { id: req.params.id } });
        res.json({ message: 'Doctor deleted.' });
    } catch (error) { res.status(500).json({ error: 'Failed to delete doctor.' }); }
});

export default router;
