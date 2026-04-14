import { Router, Request, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../core/db/prisma.service';
import nodemailer from 'nodemailer';

const router = Router();

// POST /api/contact - Submit contact form with Email Notifications
router.post('/', async (req: Request, res: Response) => {
    console.log('📬 [EMAIL SYSTEM] Received new contact submission...');
    
    try {
        const { name, email, phone, subject, message } = req.body;
        
        // 1. Validation
        if (!name || !email || !subject || !message) {
            console.warn('⚠️ [EMAIL SYSTEM] Validation failed: Missing fields');
            return res.status(400).json({ error: 'Please fill all required fields.' });
        }

        // 2. Save to Database
        const contact = await prisma.contactMessage.create({ 
            data: { name, email, phone, subject, message } 
        });
        console.log(`✅ [DB] Message saved. ID: ${contact.id}`);

        // 3. SMTP Configuration from Environment
        const smtpConfig = {
            host: process.env.SMTP_HOST || '213.55.96.132',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_SECURE === 'true', // false for 25/587
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            tls: { rejectUnauthorized: false } // Required for institutional servers
        };

        const transporter = nodemailer.createTransport(smtpConfig);

        // 4. Send Email to Admin (info@amsh.gov.et)
        const adminMailOptions = {
            from: `"AMSH Website" <${process.env.SMTP_USER}>`,
            to: 'info@amsh.gov.et',
            replyTo: email,
            subject: `New Inquiry: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
                    <h2 style="color: #1B4F8A;">New Website Inquiry</h2>
                    <p><strong>From:</strong> ${name} (${email})</p>
                    <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <div style="background: #f4f4f4; padding: 15px; border-left: 4px solid #1B4F8A;">
                        ${message}
                    </div>
                </div>`
        };

        // 5. Send Auto-Reply to User
        const userMailOptions = {
            from: `"Ayder Multi-Specialty Hospital" <${process.env.SMTP_USER}>`,
            to: email,
            subject: `Thank you for contacting EMSH`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2 style="color: #1B4F8A;">Dear ${name},</h2>
                    <p>Thank you for reaching out to Ayder Multi-Specialty Hospital. We have received your message regarding <strong>"${subject}"</strong>.</p>
                    <p>Our dedicated team will review your inquiry and get back to you within 24 hours.</p>
                    <br>
                    <p>Best regards,<br><strong>EMSH Administration</strong></p>
                </div>`
        };

        // Execute sends in background (don't block the UI response)
        console.log('🚀 [SMTP] Attempting to send Admin notification...');
        transporter.sendMail(adminMailOptions)
            .then(() => console.log('✅ [SMTP] Admin notified successfully.'))
            .catch(err => console.error('❌ [SMTP] Admin notification failed:', err.message));

        console.log('🚀 [SMTP] Sending Auto-Reply to User...');
        transporter.sendMail(userMailOptions)
            .then(() => console.log('✅ [SMTP] Auto-reply sent to user.'))
            .catch(err => console.error('❌ [SMTP] User auto-reply failed:', err.message));

        // Return success to frontend immediately
        res.status(201).json({ 
            message: 'Message sent successfully. We will respond within 24 hours.',
            id: contact.id 
        });

    } catch (error: any) {
        console.error('💥 [CRITICAL] Contact form crash:', error.message);
        res.status(500).json({ error: 'System error processing your message.' });
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
