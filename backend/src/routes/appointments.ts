import { Router, Request, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../index';

const router = Router();

// GET /api/appointments - Admin
router.get('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'CLINICAL_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const { status, date, page = '1', limit = '20' } = req.query;
        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
        const where: any = {};
        if (status) where.status = status;
        if (date) {
            const d = new Date(date as string);
            where.date = { gte: d, lt: new Date(d.getTime() + 86400000) };
        }

        const [appointments, total] = await Promise.all([
            prisma.appointment.findMany({ where, skip, take: parseInt(limit as string), orderBy: { date: 'asc' } }),
            prisma.appointment.count({ where }),
        ]);

        res.json({ appointments, total });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch appointments.' });
    }
});

// POST /api/appointments - Book appointment (Public)
router.post('/', async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, phone, department, doctor, date, time, reason } = req.body;

        if (!firstName || !lastName || !email || !phone || !department || !date || !time) {
            return res.status(400).json({ error: 'Please fill all required fields.' });
        }

        const appointment = await prisma.appointment.create({
            data: {
                firstName, lastName, email, phone,
                department, doctor,
                date: new Date(date), time, reason,
            },
        });
        res.status(201).json({
            message: 'Appointment booked successfully. We will confirm via email.',
            appointment,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to book appointment.' });
    }
});

// PATCH /api/appointments/:id/status - Admin update status
router.patch('/:id/status', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'CLINICAL_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const { status, notes } = req.body;
        const appointment = await prisma.appointment.update({
            where: { id: req.params.id },
            data: { status, notes },
        });
        res.json({ appointment });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update appointment.' });
    }
});

// DELETE /api/appointments/:id
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        await prisma.appointment.delete({ where: { id: req.params.id } });
        res.json({ message: 'Appointment deleted.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete appointment.' });
    }
});

export default router;
