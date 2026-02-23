import { Router, Request, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../index';

const router = Router();

// GET /api/jobs - Public
router.get('/', async (req: Request, res: Response) => {
    try {
        const { type, department, page = '1', limit = '10' } = req.query;
        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
        const where: any = { status: 'OPEN', deadline: { gte: new Date() } };
        if (type) where.type = type;
        if (department) where.department = { contains: department as string, mode: 'insensitive' };

        const [jobs, total] = await Promise.all([
            prisma.job.findMany({ where, skip, take: parseInt(limit as string), orderBy: { createdAt: 'desc' } }),
            prisma.job.count({ where }),
        ]);

        res.json({ jobs, pagination: { page: parseInt(page as string), total, pages: Math.ceil(total / parseInt(limit as string)) } });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch jobs.' });
    }
});

// GET /api/jobs/:id
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const job = await prisma.job.findUnique({ where: { id: req.params.id } });
        if (!job) return res.status(404).json({ error: 'Job not found.' });
        res.json({ job });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch job.' });
    }
});

// POST /api/jobs - Create (Admin)
router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const job = await prisma.job.create({
            data: { ...req.body, postedById: req.user!.id, deadline: new Date(req.body.deadline) },
        });
        res.status(201).json({ job });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create job.' });
    }
});

// PUT /api/jobs/:id - Update (Admin)
router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const job = await prisma.job.update({
            where: { id: req.params.id },
            data: { ...req.body, deadline: req.body.deadline ? new Date(req.body.deadline) : undefined },
        });
        res.json({ job });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update job.' });
    }
});

// DELETE /api/jobs/:id
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        await prisma.job.delete({ where: { id: req.params.id } });
        res.json({ message: 'Job deleted.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete job.' });
    }
});

// POST /api/jobs/:id/apply - Apply for job (Public)
router.post('/:id/apply', async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, phone, coverLetter, cvUrl } = req.body;
        const application = await prisma.jobApplication.create({
            data: { jobId: req.params.id, firstName, lastName, email, phone, coverLetter, cvUrl },
        });
        res.status(201).json({ message: 'Application submitted successfully.', application });
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit application.' });
    }
});

// GET /api/jobs/:id/applications - Admin view applications
router.get('/:id/applications', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const applications = await prisma.jobApplication.findMany({
            where: { jobId: req.params.id },
            orderBy: { createdAt: 'desc' },
        });
        res.json({ applications });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch applications.' });
    }
});

// PATCH /api/jobs/applications/:appId/status
router.patch('/applications/:appId/status', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const { status, notes } = req.body;
        const application = await prisma.jobApplication.update({
            where: { id: req.params.appId },
            data: { status, notes },
        });
        res.json({ application });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update application.' });
    }
});

export default router;
