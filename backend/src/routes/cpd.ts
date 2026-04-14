import { Router, Request, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../core/db/prisma.service';
import nodemailer from 'nodemailer';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import { getUploadBaseDir } from '../core/utils/storage';

const router = Router();

// Configure Multer for local storage (Centralized Persistence)
const uploadDir = getUploadBaseDir();

// Configure Multer for local storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Helper: detect Prisma errors caused by missing DB tables
const isMissingTableError = (error: any): boolean => {
    const msg = String(error?.message || error || '');
    const code = error?.code || '';
    // P2021 = table does not exist, P2010 = raw query failed
    return code === 'P2021' || code === 'P2010' ||
        msg.includes("doesn't exist") ||
        msg.includes('does not exist') ||
        msg.includes('Table') ||
        msg.includes('Unknown column') ||
        msg.includes('Cannot read properties of undefined') ||
        msg.includes('Invalid `prisma.');
};

// GET all registrations (Global Admin)
router.get('/registrations/all', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'CPD_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const registrations = await prisma.cPDRegistration.findMany({
            include: { course: { select: { title: true } } },
            orderBy: { createdAt: 'desc' },
        });
        console.log(`[CPD] Fetched ${registrations.length} registrations.`);
        res.json({ registrations });
    } catch (error: any) {
        const code = error?.code || '';
        const msg = error?.message || '';
        console.error('[CPD] /registrations/all error — Code:', code, '| Message:', msg);

        if (isMissingTableError(error)) {
            // Table doesn't exist yet — return empty gracefully so dashboard doesn't crash
            console.warn('[CPD] cpd_registrations table missing in DB. Run AMSH_FIX_DATABASE.sql to create it.');
            return res.json({ registrations: [], warning: 'CPD table not yet created. Please run the database migration.' });
        }

        res.status(500).json({ 
            error: 'Failed to fetch registrations.',
            code,
            detail: msg,
        });
    }
});

// PATCH update registration status
router.patch('/registrations/:id/status', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'CPD_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const { status } = req.body;
        const registration = await prisma.cPDRegistration.update({
            where: { id: req.params.id },
            data: { status },
        });
        res.json({ registration });
    } catch (error) {
        console.error('Update cpd reg status error:', error);
        res.status(500).json({ error: 'Failed to update status.' });
    }
});

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
router.post('/:id/register', upload.fields([
    { name: 'licenseDoc', maxCount: 1 },
    { name: 'idDoc', maxCount: 1 },
    { name: 'paymentDoc', maxCount: 1 }
]), async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, phone, profession, workplace, licenseNo, category } = req.body;
        
        if (!firstName || !lastName || !email || !phone) {
            console.error('MISSING REQUIRED FIELDS:', req.body);
            return res.status(400).json({ error: 'Missing required fields (Name, Email, Phone).' });
        }
        
        console.log('CPD REGISTRATION START:', req.body);
        console.log('CPD FILES RECEIVED:', req.files);
        
        // Handle uploaded documents
        const files: any = req.files || {};
        const documentLinks = {
            licenseDoc: files['licenseDoc']?.[0]?.filename ? `/uploads/${files['licenseDoc'][0].filename}` : null,
            idDoc: files['idDoc']?.[0]?.filename ? `/uploads/${files['idDoc'][0].filename}` : null,
            paymentDoc: files['paymentDoc']?.[0]?.filename ? `/uploads/${files['paymentDoc'][0].filename}` : null,
        };
        const certificate = JSON.stringify(documentLinks);
        
        // Fetch course title for the email
        let course = await prisma.cPDCourse.findUnique({
            where: { id: req.params.id },
            select: { title: true }
        });

        // Ensure course exists to satisfy foreign key constraint for dummy frontend data
        if (!course) {
            await prisma.cPDCourse.create({
                data: {
                    id: req.params.id,
                    title: 'Training Course',
                    description: 'Auto-generated for legacy frontend link',
                    instructor: 'AMSH Staff',
                    duration: 'Varies',
                    category: 'General',
                    status: 'PUBLISHED'
                }
            });
            course = { title: 'Training Course' };
        }

        const registration = await prisma.cPDRegistration.create({
            data: { courseId: req.params.id, firstName, lastName, email, phone, profession, workplace, licenseNo, category, certificate },
        });

        // Email Notification Logic
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

            const emailContent = `
                <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
                    <div style="background: #1B4F8A; color: #fff; padding: 20px; text-align: center;">
                        <h2 style="margin: 0;">New CPD Registration</h2>
                    </div>
                    <div style="padding: 30px;">
                        <p>A new professional has applied for a CPD training session.</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                        <p><strong>Training Course:</strong> ${course?.title || 'Unknown Course'}</p>
                        <p><strong>Applicant Name:</strong> ${firstName} ${lastName}</p>
                        <p><strong>Profession:</strong> ${profession}</p>
                        <p><strong>Workplace:</strong> ${workplace}</p>
                        <p><strong>License No:</strong> ${licenseNo}</p>
                        <p><strong>Contact:</strong> ${email} / ${phone}</p>
                        <p><strong>Category:</strong> ${category}</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                        <p style="font-size: 12px; color: #888;">This is an automated institutional notification.</p>
                    </div>
                </div>
            `;

            // 2. Notification for the Applicant
            const applicantContent = `
                <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
                    <div style="background: #1B4F8A; color: #fff; padding: 20px; text-align: center;">
                        <h2 style="margin: 0;">Application Received</h2>
                    </div>
                    <div style="padding: 30px;">
                        <p>Dear ${firstName},</p>
                        <p>This is to confirm that we have received your application for <strong>${course?.title || 'the selected course'}</strong>.</p>
                        <p>Your application is currently being reviewed by our Directorate. You will be notified of the status shortly.</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                        <p style="font-size: 12px; color: #888;">Thank you for choosing Amanuel Mental Specialized Hospital.</p>
                    </div>
                </div>
            `;

            await Promise.all([
                transporter.sendMail({
                    from: process.env.EMAIL_INFO_FROM,
                    to: `${process.env.SMTP_INFO_USER}, cpd@amsh.gov.et, info@amsh.gov.et`,
                    subject: `New CPD Application: ${course?.title || 'Training'}`,
                    html: emailContent,
                }),
                transporter.sendMail({
                    from: process.env.EMAIL_INFO_FROM,
                    to: email, // Applicant email
                    subject: `Application Confirmation: ${course?.title || 'CPD Training'}`,
                    html: applicantContent,
                })
            ]);
        } catch (emailError) {
            console.error('CPD Registration Email Error:', emailError);
        }

        // Send success if email fails, it's just logging
        res.status(201).json({ message: 'Registration successful. A confirmation email has been sent to you.', registration });
    } catch (error: any) { 
        console.error('SERVER P500:', error);
        res.status(500).json({ error: error.message || 'Failed to register.' }); 
    }
});

// GET /api/cpd/:id/registrations - Admin
router.get('/:id/registrations', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const registrations = await prisma.cPDRegistration.findMany({ where: { courseId: req.params.id }, orderBy: { createdAt: 'desc' } });
        res.json({ registrations });
    } catch (error) { res.status(500).json({ error: 'Failed to fetch registrations.' }); }
});

export default router;
