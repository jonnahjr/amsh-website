import { Router, Request, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../index';
import nodemailer from 'nodemailer';

const router = Router();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    tls: {
        rejectUnauthorized: false
    }
});

// POST /api/contact - Submit contact form
router.post('/', async (req: Request, res: Response) => {
    try {
        // Refresh environment variables for immediate pick-up of institutional changes
        require('dotenv').config();

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_SECURE === 'true',
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
            tls: {
                rejectUnauthorized: false
            }
        });

        const { name, email, phone, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'Please fill all required fields.' });
        }

        const contact = await prisma.contactMessage.create({ data: { name, email, phone, subject, message } });

        // Send notification email to admin (optional)
        try {
            await transporter.sendMail({
                from: process.env.EMAIL_FROM,
                to: process.env.SMTP_USER,
                subject: `New Contact: ${subject}`,
                html: `<h3>New contact message from ${name}</h3><p>Email: ${email}</p><p>Phone: ${phone}</p><p>Message: ${message}</p>`,
            });
        } catch (_) { }

        res.status(201).json({ message: 'Message sent successfully. We will respond within 24 hours.', id: contact.id });
    } catch (error: any) {
        console.error('Contact error:', error);
        res.status(500).json({
            error: 'Failed to send message.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// GET /api/contact - Admin view messages
router.get('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'CONTACT_ADMIN', 'CLINICAL_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const { isRead, page = '1' } = req.query;
        const skip = (parseInt(page as string) - 1) * 20;
        const where: any = {};
        if (isRead !== undefined) where.isRead = isRead === 'true';
        const [messages, total] = await Promise.all([
            prisma.contactMessage.findMany({ where, skip, take: 20, orderBy: { createdAt: 'desc' } }),
            prisma.contactMessage.count({ where }),
        ]);
        res.json({ messages, total });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages.' });
    }
});

// PATCH /api/contact/:id/read
router.patch('/:id/read', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'CONTACT_ADMIN', 'CLINICAL_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        await prisma.contactMessage.update({ where: { id: req.params.id }, data: { isRead: true } });
        res.json({ message: 'Marked as read.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update message.' });
    }
});

export default router;
