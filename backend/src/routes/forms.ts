import { Router, Request, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../index';

const router = Router();

// Forms
router.get('/', async (req: Request, res: Response) => {
    try {
        const forms = await prisma.form.findMany({ where: { isActive: true, isPublic: true } });
        res.json({ forms });
    } catch (error) { res.status(500).json({ error: 'Failed to fetch forms.' }); }
});

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const form = await prisma.form.findUnique({ where: { id: req.params.id } });
        if (!form) return res.status(404).json({ error: 'Form not found.' });
        res.json({ form });
    } catch (error) { res.status(500).json({ error: 'Failed to fetch form.' }); }
});

router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const form = await prisma.form.create({ data: { ...req.body, fields: JSON.stringify(req.body.fields) } });
        res.status(201).json({ form });
    } catch (error) { res.status(500).json({ error: 'Failed to create form.' }); }
});

router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const form = await prisma.form.update({ where: { id: req.params.id }, data: { ...req.body, fields: JSON.stringify(req.body.fields) } });
        res.json({ form });
    } catch (error) { res.status(500).json({ error: 'Failed to update form.' }); }
});

router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        await prisma.form.delete({ where: { id: req.params.id } });
        res.json({ message: 'Form deleted.' });
    } catch (error) { res.status(500).json({ error: 'Failed to delete form.' }); }
});

// Submit form
router.post('/:id/submit', async (req: Request, res: Response) => {
    try {
        const submission = await prisma.formSubmission.create({
            data: { formId: req.params.id, data: JSON.stringify(req.body), ipAddress: req.socket.remoteAddress, userAgent: req.headers['user-agent'] },
        });
        res.status(201).json({ message: 'Form submitted successfully.', id: submission.id });
    } catch (error) { res.status(500).json({ error: 'Failed to submit form.' }); }
});

// Admin get submissions
router.get('/:id/submissions', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const submissions = await prisma.formSubmission.findMany({ where: { formId: req.params.id }, orderBy: { createdAt: 'desc' } });
        res.json({ submissions });
    } catch (error) { res.status(500).json({ error: 'Failed to fetch submissions.' }); }
});

export default router;
