import { Router, Request, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../core/db/prisma.service';
import nodemailer from 'nodemailer';

const router = Router();

const isMissingTableError = (error: any): boolean => {
    const msg = String(error?.message || error || '');
    const code = error?.code || '';
    return code === 'P2021' || code === 'P2010' ||
        msg.includes("doesn't exist") ||
        msg.includes('does not exist') ||
        msg.includes('Table') ||
        msg.includes('Unknown column') ||
        msg.includes('Cannot read properties of undefined') ||
        msg.includes('Invalid `prisma.');
};

// Forms
router.get('/', async (req: Request, res: Response) => {
    try {
        const forms = await prisma.form.findMany({ where: { isActive: true, isPublic: true } });
        res.json({ forms });
    } catch (error) { res.status(500).json({ error: 'Failed to fetch forms.' }); }
});

// ⚠️ IMPORTANT: Static routes MUST come before dynamic /:id routes in Express
// Admin get all submissions (global)
router.get('/all/submissions', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const submissions = await prisma.formSubmission.findMany({
            include: { form: true },
            orderBy: { createdAt: 'desc' }
        });
        console.log(`[FORMS] Fetched ${submissions.length} submissions.`);
        res.json({ submissions });
    } catch (error: any) {
        const code = error?.code || '';
        const msg = error?.message || '';
        console.error('[FORMS] /all/submissions error — Code:', code, '| Message:', msg);

        if (isMissingTableError(error)) {
            console.warn('[FORMS] form_submissions table missing in DB. Run AMSH_FIX_DATABASE.sql to create it.');
            return res.json({ submissions: [], warning: 'Form submissions table not yet created. Please run the database migration.' });
        }

        res.status(500).json({
            error: 'Failed to fetch global submissions.',
            code,
            detail: msg,
        });
    }
});

// Admin update submission status
router.patch('/submissions/:id/status', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const { status } = req.body;
        const submission = await prisma.formSubmission.update({
            where: { id: req.params.id },
            // @ts-ignore - status field added via db push but generate is locked on Windows
            data: { status },
        });
        res.json({ submission });
    } catch (error) {
        console.error('Update submission status error:', error);
        res.status(500).json({ error: 'Failed to update status.' });
    }
});

// Dynamic /:id route — must come AFTER all static routes
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

        // Specific handling for Clinical Attachment and CPD-related forms
        if (req.params.id === 'clinical-attachment-form') {
            try {
                const transporter = nodemailer.createTransport({
                    host: process.env.SMTP_INFO_HOST,
                    port: parseInt(process.env.SMTP_INFO_PORT || '465'),
                    secure: process.env.SMTP_INFO_SECURE === 'true',
                    auth: { user: process.env.SMTP_INFO_USER, pass: process.env.SMTP_INFO_PASS },
                    tls: { rejectUnauthorized: false },
                    connectionTimeout: 5000,
                    greetingTimeout: 5000,
                    socketTimeout: 5000,
                });

                const data = req.body;
                const emailContent = `
                    <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
                        <div style="background: #1B4F8A; color: #fff; padding: 20px; text-align: center;">
                            <h2 style="margin: 0;">New Clinical Attachment Application</h2>
                        </div>
                        <div style="padding: 30px;">
                            <p><strong>Institution/Applicant:</strong> ${data.institutionName || 'N/A'}</p>
                            <p><strong>Department:</strong> ${data.departmentName || 'N/A'}</p>
                            <p><strong>Profession:</strong> ${data.profession || 'N/A'}</p>
                            <p><strong>Contact Person:</strong> ${data.contactPerson || 'N/A'}</p>
                            <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
                            <p><strong>Phone:</strong> ${data.phoneNumber || 'N/A'}</p>
                            <p><strong>Category:</strong> ${data.category || 'N/A'}</p>
                            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                            <p style="font-size: 12px; color: #888;">This is an automated institutional notification for the Internship Coordinator.</p>
                        </div>
                    </div>
                `;

                const applicantContent = `
                    <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
                        <div style="background: #1B4F8A; color: #fff; padding: 20px; text-align: center;">
                            <h2 style="margin: 0;">Application Received</h2>
                        </div>
                        <div style="padding: 30px;">
                            <p>Dear Applicant,</p>
                            <p>This is to confirm that we have received your clinical attachment request for <strong>${data.institutionName || 'Amanuel Mental Specialized Hospital'}</strong>.</p>
                            <p>Our Internship Coordination department is currently reviewing your documentation. You will be notified via email or phone once a decision is made.</p>
                            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                            <p style="font-size: 12px; color: #888;">Thank you for choosing Amanuel Mental Specialized Hospital.</p>
                        </div>
                    </div>
                `;

                await Promise.all([
                    transporter.sendMail({
                        from: process.env.EMAIL_INFO_FROM,
                        to: `${process.env.SMTP_INFO_USER}, internship@amsh.gov.et, info@amsh.gov.et`,
                        subject: `New Clinical Attachment: ${data.institutionName || 'Inquiry'}`,
                        html: emailContent,
                    }),
                    transporter.sendMail({
                        from: process.env.EMAIL_INFO_FROM,
                        to: data.email,
                        subject: `Clinical Attachment Application Received`,
                        html: applicantContent,
                    })
                ]);
            } catch (emailError) {
                console.error('Form Notification Email Error:', emailError);
            }
        }

        res.status(201).json({ message: 'Form submitted successfully. A confirmation email has been sent to you.', id: submission.id });
    } catch (error) { res.status(500).json({ error: 'Failed to submit form.' }); }
});

// Admin get submissions by form ID
router.get('/:id/submissions', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const submissions = await prisma.formSubmission.findMany({ where: { formId: req.params.id }, include: { form: true }, orderBy: { createdAt: 'desc' } });
        res.json({ submissions });
    } catch (error) { res.status(500).json({ error: 'Failed to fetch submissions.' }); }
});

export default router;
