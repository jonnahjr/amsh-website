import { Router, Request, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../index';

const router = Router();

// CPD Courses
router.get('/', async (req: Request, res: Response) => {
    try {
        const { category, isOnline, page = '1', limit = '10' } = req.query;
        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
        const where: any = { status: 'PUBLISHED' };
        if (category) where.category = category;
        if (isOnline !== undefined) where.isOnline = isOnline === 'true';
        const [courses, total] = await Promise.all([
            prisma.cPDCourse.findMany({ where, skip, take: parseInt(limit as string), orderBy: { createdAt: 'desc' }, include: { _count: { select: { registrations: true } } } }),
            prisma.cPDCourse.count({ where }),
        ]);
        res.json({ courses, pagination: { total, pages: Math.ceil(total / parseInt(limit as string)) } });
    } catch (error) { res.status(500).json({ error: 'Failed to fetch courses.' }); }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const course = await prisma.cPDCourse.findUnique({ where: { id: req.params.id }, include: { _count: { select: { registrations: true } } } });
        if (!course) return res.status(404).json({ error: 'Course not found.' });
        res.json({ course });
    } catch (error) { res.status(500).json({ error: 'Failed to fetch course.' }); }
});

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const course = await prisma.cPDCourse.create({ data: { ...req.body, startDate: req.body.startDate ? new Date(req.body.startDate) : undefined, endDate: req.body.endDate ? new Date(req.body.endDate) : undefined } });
        res.status(201).json({ course });
    } catch (error) { res.status(500).json({ error: 'Failed to create course.' }); }
});

router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const course = await prisma.cPDCourse.update({ where: { id: req.params.id }, data: { ...req.body, startDate: req.body.startDate ? new Date(req.body.startDate) : undefined, endDate: req.body.endDate ? new Date(req.body.endDate) : undefined } });
        res.json({ course });
    } catch (error) { res.status(500).json({ error: 'Failed to update course.' }); }
});

router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        await prisma.cPDCourse.delete({ where: { id: req.params.id } });
        res.json({ message: 'Course deleted.' });
    } catch (error) { res.status(500).json({ error: 'Failed to delete course.' }); }
});

// POST /api/cpd/:id/register
router.post('/:id/register', async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, phone, profession, workplace, licenseNo } = req.body;
        const registration = await prisma.cPDRegistration.create({
            data: { courseId: req.params.id, firstName, lastName, email, phone, profession, workplace, licenseNo },
        });
        res.status(201).json({ message: 'Registration successful.', registration });
    } catch (error) { res.status(500).json({ error: 'Failed to register.' }); }
});

// GET /api/cpd/:id/registrations - Admin
router.get('/:id/registrations', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const registrations = await prisma.cPDRegistration.findMany({ where: { courseId: req.params.id }, orderBy: { createdAt: 'desc' } });
        res.json({ registrations });
    } catch (error) { res.status(500).json({ error: 'Failed to fetch registrations.' }); }
});

export default router;
