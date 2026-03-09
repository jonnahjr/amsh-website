import { Router, Request, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../index';
import nodemailer from 'nodemailer';

const router = Router();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

// Newsletter subscribe
router.post('/subscribe', async (req: Request, res: Response) => {
    try {
        const { email, name } = req.body;
        if (!email) return res.status(400).json({ error: 'Email is required.' });
        await prisma.newsletterSubscriber.upsert({
            where: { email },
            update: { isActive: true, name },
            create: { email, name, isActive: true },
        });
        res.json({ message: 'Successfully subscribed to newsletter!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to subscribe.' });
    }
});

// Admin list subscribers
router.get('/subscribers', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const subscribers = await prisma.newsletterSubscriber.findMany({ where: { isActive: true }, orderBy: { subscribedAt: 'desc' } });
        res.json({ subscribers, total: subscribers.length });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch subscribers.' });
    }
});

// Admin broadcast newsletter
router.post('/broadcast', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const { subject, content } = req.body;
        if (!subject || !content) return res.status(400).json({ error: 'Subject and content are required.' });

        const subscribers = await prisma.newsletterSubscriber.findMany({ where: { isActive: true } });
        const emails = subscribers.map(s => s.email);

        if (emails.length === 0) return res.status(400).json({ error: 'No active subscribers found.' });

        // For large numbers of emails, you'd typically use a queue or bcc
        // For simplicity, we'll send it as BCC to all
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            bcc: emails,
            subject: subject,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #1e3a8a; margin: 0;">EMSH Newsletter</h1>
                        <p style="color: #64748b; font-size: 14px;">Emmanuel Mental Specialized Hospital</p>
                    </div>
                    <div style="color: #334155; line-height: 1.6;">
                        ${content.replace(/\n/g, '<br/>')}
                    </div>
                    <div style="margin-top: 40px; padding-top: 20px; border-t: 1px solid #eee; font-size: 12px; color: #94a3b8; text-align: center;">
                        <p>&copy; ${new Date().getFullYear()} Emmanuel Mental Specialized Hospital. All rights reserved.</p>
                        <p>You are receiving this because you subscribed to our newsletter.</p>
                    </div>
                </div>
            `,
        });

        res.json({ message: `Newsletter broadcasted to ${emails.length} subscribers.` });
    } catch (error: any) {
        console.error('Broadcast error:', error);
        res.status(500).json({
            error: 'Failed to broadcast newsletter.',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

export default router;
