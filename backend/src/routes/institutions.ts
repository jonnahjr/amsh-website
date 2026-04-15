import { Router, Request, Response } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { prisma } from '../core/db/prisma.service';

const router = Router();

/**
 * @route GET /api/institutions
 * @desc Get all institutions for public dropdown (Clinical Attachment Form)
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const institutions = await prisma.institution.findMany({
            orderBy: { name: 'asc' }
        });

        // Add client-side calculated status just in case (e.g. if record exists but date passed)
        const now = new Date();
        const results = institutions.map((inst: any) => {
            const end = new Date(inst.mouEnd);
            const isDateExpired = end < now;
            
            return {
                ...inst,
                // If it's date-expired, enforce 'Expired' even if DB says 'Approved'
                status: isDateExpired ? 'Expired' : inst.status
            };
        });

        res.json(results);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @route GET /api/institutions/admin
 * @desc Admin detailed management with "Days Left" calculation
 */
router.get('/admin', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: Request, res: Response) => {
    try {
        const institutions = await prisma.institution.findMany({
            orderBy: { createdAt: 'desc' }
        });

        const now = new Date();
        const results = institutions.map((inst: any) => {
            const end = new Date(inst.mouEnd);
            const diffTime = end.getTime() - now.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            return {
                ...inst,
                daysLeft: diffDays > 0 ? diffDays : 0,
                isExpired: diffDays <= 0 || inst.status === 'Expired'
            };
        });

        res.json(results);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @route POST /api/institutions
 * @desc Add new institution with 2-year auto-expiry
 */
router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: Request, res: Response) => {
    try {
        const { name, mouStart, status } = req.body;
        
        const startDate = new Date(mouStart);
        // Automatically set expiry to exactly 2 years after start as per requirement
        const endDate = new Date(startDate);
        endDate.setFullYear(endDate.getFullYear() + 2);

        const institution = await prisma.institution.create({
            data: {
                name,
                mouStart: startDate,
                mouEnd: endDate,
                status: status || 'Approved'
            }
        });
        res.status(201).json(institution);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @route PUT /api/institutions/:id
 * @desc Update institution details
 */
router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: Request, res: Response) => {
    try {
        const { name, mouStart, mouEnd, status } = req.body;
        
        const data: any = { name, status };
        if (mouStart) {
            data.mouStart = new Date(mouStart);
            // Default End to Start + 2 years if not explicitly changed
            if (!mouEnd) {
                const end = new Date(data.mouStart);
                end.setFullYear(end.getFullYear() + 2);
                data.mouEnd = end;
            }
        }
        if (mouEnd) data.mouEnd = new Date(mouEnd);

        const institution = await prisma.institution.update({
            where: { id: req.params.id },
            data
        });
        res.json(institution);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @route DELETE /api/institutions/:id
 * @desc Remove institution record
 */
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: Request, res: Response) => {
    try {
        await prisma.institution.delete({ where: { id: req.params.id } });
        res.json({ message: 'Institution deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
