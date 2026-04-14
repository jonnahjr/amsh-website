import { Router, Request, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../core/db/prisma.service';
import nodemailer from 'nodemailer';

const router = Router();

const getTransporter = async () => {
    const settings = await prisma.siteSetting.findMany({
        where: {
            key: { in: ['smtp_host', 'smtp_port', 'smtp_user', 'smtp_pass', 'smtp_secure'] }
        }
    });

    const config: Record<string, string> = {};
    settings.forEach(s => { config[s.key] = s.value; });

    const host = config.smtp_host || process.env.SMTP_HOST || 'smtp.amsh.gov.et';
    const port = parseInt(config.smtp_port || process.env.SMTP_PORT || '587');
    const secure = (config.smtp_secure || process.env.SMTP_SECURE) === 'true';
    const user = config.smtp_user || process.env.SMTP_USER || 'newsletter@amsh.gov.et';
    const pass = config.smtp_pass || process.env.SMTP_PASS || 'Amsh@1234';

    console.log(`📠 [SMTP] Configuring transporter for ${user}@${host}:${port} (Secure: ${secure})`);

    return nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
        tls: { rejectUnauthorized: false }
    });
};

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
        // Refresh environment variables for immediate pick-up of institutional changes
        require('dotenv').config({ override: true });

        const { subject, content } = req.body;
        if (!subject || !content) return res.status(400).json({ error: 'Subject and content are required.' });

        const subscribers = await prisma.newsletterSubscriber.findMany({ where: { isActive: true } });
        const emails = subscribers.map(s => s.email);

        if (emails.length === 0) return res.status(400).json({ error: 'No active subscribers found.' });

        const transporter = await getTransporter();

        const emailFromSetting = await prisma.siteSetting.findUnique({ where: { key: 'email_from' } });
        const fromAddress = emailFromSetting?.value || process.env.EMAIL_FROM || 'newsletter@amsh.gov.et';

        console.log(`📡 [Newsletter] Broadcasting transmission from ${fromAddress} to ${emails.length} subscribers...`);

        await transporter.sendMail({
            from: `"AMSH Newsletter" <${fromAddress}>`,
            bcc: emails,
            subject: subject,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
                    <div style="background-color: #1e3a8a; padding: 40px 20px; text-align: center; color: #ffffff;">
                        <h1 style="margin: 0; font-size: 24px; letter-spacing: 1px; text-transform: uppercase;">AMSH Institutional Bulletin</h1>
                        <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Amanuel Mental Specialized Hospital</p>
                    </div>
                    <div style="padding: 40px 30px; color: #334155; line-height: 1.8; font-size: 16px;">
                        <div style="margin-bottom: 30px;">
                            ${content.replace(/\n/g, '<br/>')}
                        </div>
                        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; font-size: 14px; color: #64748b;">
                            <strong>Note:</strong> This is an official institutional transmission from Amanuel Mental Specialized Hospital.
                        </div>
                    </div>
                    <div style="background-color: #f1f5f9; padding: 30px; text-align: center; font-size: 13px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
                        <p style="margin: 0 0 10px 0;">&copy; ${new Date().getFullYear()} Amanuel Mental Specialized Hospital. Addis Ababa, Ethiopia.</p>
                        <p style="margin: 0;">You are receiving this communication based on your subscription to our health bulletins. 
                        To unsubscribe, please contact info@amsh.gov.et</p>
                    </div>
                </div>
            `,
        });

        res.json({ message: `Newsletter broadcasted to ${emails.length} subscribers.` });
    } catch (error: any) {
        console.error('Broadcast error:', error);
        const smtpHost = await prisma.siteSetting.findUnique({ where: { key: 'smtp_host' } });
        const smtpPort = await prisma.siteSetting.findUnique({ where: { key: 'smtp_port' } });

        res.status(500).json({
            error: 'Failed to broadcast newsletter.',
            host: smtpHost?.value || process.env.SMTP_HOST,
            port: smtpPort?.value || process.env.SMTP_PORT,
            details: error.message
        });
    }
});

export default router;
