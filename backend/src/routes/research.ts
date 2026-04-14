import { Router, Request, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../core/db/prisma.service';
import nodemailer from 'nodemailer';

import multer from 'multer';
import path from 'path';
import fs from 'fs';

import { getUploadBaseDir } from '../core/utils/storage';

const router = Router();

// DEBUG: DB Schema Check (Admin only)
router.get('/debug/db', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: Request, res: Response) => {
    try {
        const columns = await prisma.$queryRawUnsafe(`SHOW COLUMNS FROM research`);
        res.json({ table: 'research', columns });
    } catch (error: any) {
        res.status(500).json({ error: 'DB Debug failed', detail: error.message });
    }
});

// Configure Multer for local storage (Centralized Persistence)
const uploadDir = getUploadBaseDir();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDFs and images are allowed.'));
        }
    },
}).fields([
    { name: 'proposalPDF', maxCount: 1 },
    { name: 'ethicalLetter', maxCount: 1 },
    { name: 'universityLetter', maxCount: 1 },
    { name: 'coInvestigatorFile', maxCount: 1 }
]);

// GET /api/research - Public
router.get('/', async (req: Request, res: Response) => {
    try {
        const { category, status = 'PUBLISHED', page = '1', limit = '10', search } = req.query;
        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
        const where: any = { status };
        if (category) where.category = category;
        if (search) {
            where.OR = [
                { title: { contains: search as string, mode: 'insensitive' } },
                { abstract: { contains: search as string, mode: 'insensitive' } },
            ];
        }

        const [research, total] = await Promise.all([
            prisma.research.findMany({ where, skip, take: parseInt(limit as string), orderBy: { publishedAt: 'desc' } }),
            prisma.research.count({ where }),
        ]);

        res.json({ research, pagination: { total, page: parseInt(page as string), pages: Math.ceil(total / parseInt(limit as string)) } });
    } catch (error: any) {
        console.error('❌ AMSH Research Fetch Error:', error?.message || error);
        res.status(500).json({ error: 'Failed to fetch research.', detail: error?.message });
    }
});

// GET /api/research/track/:submissionId - Public tracking (MUST be before /:id)
router.get('/track/:submissionId', async (req: Request, res: Response) => {
    try {
        // Sanitize: strip any accidental 'ID: ' prefix users might copy-paste
        const rawId = req.params.submissionId;
        const submissionId = rawId.replace(/^id[:\s]+/i, '').trim();

        const items = await prisma.$queryRawUnsafe<any[]>(
            `SELECT id, submissionId, title, investigatorName, institution, researchType, studyLocation, status, reviewerComments, createdAt, updatedAt 
             FROM research 
             WHERE TRIM(LOWER(submissionId)) = TRIM(LOWER(?)) 
             LIMIT 1`, 
            submissionId
        );

        if (!items || items.length === 0) {
            return res.status(404).json({ error: 'No research found with this tracking ID.' });
        }

        res.json({ research: items[0] });
    } catch (error) {
        console.error('Tracking fetch error:', error);
        res.status(500).json({ error: 'Tracking service error.' });
    }
});

// GET /api/research/admin/all - Admin view all (MUST be before /:id)
router.get('/admin/all', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'RESEARCH_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const research = await prisma.research.findMany({ orderBy: { createdAt: 'desc' } });
        res.json({ research });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch research.' });
    }
});

// GET /api/research/:id
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const item = await prisma.research.findUnique({ where: { id: req.params.id } });
        if (!item) return res.status(404).json({ error: 'Research not found.' });
        await prisma.research.update({ where: { id: item.id }, data: { views: { increment: 1 } } });
        res.json({ research: item });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch research.' });
    }
});

// POST /api/research - Submit research (Public)
router.post('/', upload, async (req: Request, res: Response) => {
    try {
        const { 
            title, abstract, investigatorName, institution, email, phone, department, position,
            researchType, studyArea, studyLocation, startDate, endDate, keywords,
            patientsInvolved, participantType, dataCollectionMethod,
            coInvestigators, supervisorName, supervisorEmail, supervisorInstitution,
            category 
        } = req.body;
        const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;

        // 🛡️ INSTITUTIONAL PER-FIELD SIZE VALIDATION
        if (files) {
            const MB = 1024 * 1024;
            const validationPairs = [
                { field: 'proposalPDF', limit: 15 * MB, label: 'Research Proposal' },
                { field: 'ethicalLetter', limit: 5 * MB, label: 'Ethical Approval Letter' },
                { field: 'universityLetter', limit: 5 * MB, label: 'University/College Letter' },
                { field: 'coInvestigatorFile', limit: 5 * MB, label: 'Co-Investigator Documents' }
            ];

            for (const v of validationPairs) {
                const file = files[v.field]?.[0];
                if (file && file.size > v.limit) {
                    // Try to clean up uploaded files on error (though Multer already saved them)
                    return res.status(400).json({ error: `Institutional Limit Exceeded: ${v.label} must be under ${v.limit / MB}MB.` });
                }
            }
        }

        const proposalUrl = files && files['proposalPDF'] ? `/uploads/${files['proposalPDF'][0].filename}` : undefined;
        const ethicalLetterUrl = files && files['ethicalLetter'] ? `/uploads/${files['ethicalLetter'][0].filename}` : undefined;
        const universityLetterUrl = files && files['universityLetter'] ? `/uploads/${files['universityLetter'][0].filename}` : undefined;
        const coInvestigatorFileUrl = files && files['coInvestigatorFile'] ? `/uploads/${files['coInvestigatorFile'][0].filename}` : undefined;

        // Generate Submission ID
        const year = new Date().getFullYear();
        const count = await prisma.research.count();
        const submissionId = `AMSH-RES-${year}-${(count + 1).toString().padStart(4, '0')}`;
        
        console.log(`🚀 [AMSH RESEARCH] New Submission: ${submissionId} | Title: ${title}`);
        console.log(`📂 [AMSH RESEARCH] Files will be stored in: ${uploadDir}`);

        const createData: any = {
            submissionId,
            title: title || 'Untitled Research',
            abstract: abstract || 'No abstract provided.',
            investigatorName: investigatorName || undefined,
            email: email || undefined,
            phone: phone || undefined,
            institution: institution || undefined,
            department: department || undefined,
            position: position || undefined,
            researchType: researchType || undefined,
            studyArea: studyArea || undefined,
            studyLocation: studyLocation || undefined,
            startDate: (startDate && startDate !== 'undefined') ? new Date(startDate) : undefined,
            endDate: (endDate && endDate !== 'undefined') ? new Date(endDate) : undefined,
            keywords: keywords || undefined,
            patientsInvolved: patientsInvolved === 'true' || patientsInvolved === true,
            participantType: participantType || undefined,
            dataCollectionMethod: dataCollectionMethod || undefined,
            coInvestigators: Array.isArray(coInvestigators) ? JSON.stringify(coInvestigators) : (typeof coInvestigators === 'string' ? coInvestigators : undefined),
            supervisorName: supervisorName || undefined,
            supervisorEmail: supervisorEmail || undefined,
            supervisorInstitution: supervisorInstitution || undefined,
            journal: req.body.journal || undefined,
            year: req.body.year || undefined,
            proposal: proposalUrl || undefined,
            ethicalLetter: ethicalLetterUrl || undefined,
            universityLetter: universityLetterUrl || undefined,
            coInvestigatorFile: coInvestigatorFileUrl || undefined,
            category: category || 'General',
            status: 'PENDING'
        };

        console.log('🚀 AMSH: Creating research submission:', submissionId);

        const item = await prisma.research.create({ data: createData });

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
                        <h2 style="margin: 0;">New Research Submission</h2>
                    </div>
                    <div style="padding: 30px;">
                        <p>A new research proposal has been submitted for institutional review with <strong>ID: ${submissionId}</strong></p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                        <p><strong>Title:</strong> ${title}</p>
                        <p><strong>Investigator:</strong> ${investigatorName}</p>
                        <p><strong>Institution:</strong> ${institution}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                        <p><strong>Submission Date:</strong> ${new Date().toLocaleDateString()}</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                        <p>Review the full details and documents in the institutional admin portal.</p>
                        <p style="font-size: 12px; color: #888;">This is an automated institutional notification for the Research & CPD Directorate.</p>
                    </div>
                </div>
            `;

            await transporter.sendMail({
                from: process.env.EMAIL_INFO_FROM,
                to: `${process.env.SMTP_INFO_USER}, research@amsh.gov.et, info@amsh.gov.et`,
                subject: `New Research Submission: ${title}`,
                html: emailContent,
            });
        } catch (emailError) {
            console.error('Research Submission Email Error:', emailError);
        }

        res.status(201).json({ message: 'Research submitted for review.', research: item });
    } catch (error: any) {
        console.error('Research Submission Error:', error);
        res.status(500).json({ 
            error: 'Failed to submit research.', 
            detail: error?.message || 'Unknown internal error',
            stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
        });
    }
});

// PATCH /api/research/:id/status - Update submission status (Admin)
router.patch('/:id/status', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'RESEARCH_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const { status } = req.body;
        
        // Fetch current research item to get investor's email and title
        const currentItem = await prisma.research.findUnique({
            where: { id: req.params.id }
        });

        if (!currentItem) {
            return res.status(404).json({ error: 'Research item not found.' });
        }

        const item = await prisma.research.update({
            where: { id: req.params.id },
            data: { status, publishedAt: status === 'PUBLISHED' ? new Date() : undefined },
        });

        res.json({ research: item });

        // 📧 Institutional Notification (Background Process)
        (async () => {
            if (!currentItem.email) return;

            try {
                // Retrieve configuration from Site Settings (Proven working config for institutional mail)
                const smtpSettings = await prisma.siteSetting.findMany({
                    where: { key: { in: ['smtp_host', 'smtp_port', 'smtp_user', 'smtp_pass', 'smtp_secure'] } }
                });
                
                const config: Record<string, string> = {};
                smtpSettings.forEach(s => { config[s.key] = s.value; });

                const host = config.smtp_host || process.env.SMTP_INFO_HOST || '213.55.96.132';
                const port = parseInt(config.smtp_port || process.env.SMTP_INFO_PORT || '25');
                const secure = (config.smtp_secure || process.env.SMTP_INFO_SECURE) === 'true';
                const user = config.smtp_user || process.env.SMTP_INFO_USER || 'info@amsh.gov.et';
                const pass = config.smtp_pass || process.env.SMTP_INFO_PASS || 'Amsh@1234';

                const transporter = nodemailer.createTransport({
                    host,
                    port,
                    secure,
                    auth: { user, pass },
                    tls: { rejectUnauthorized: false },
                    connectionTimeout: 15000,
                });

                let statusText = status.replace('_', ' ');
                let subject = `Research Status Update: ${currentItem.submissionId}`;
                let message = `The status of your research proposal "${currentItem.title}" has been updated to <strong>${statusText}</strong>.`;

                if (status === 'UNDER_REVIEW') {
                    subject = `Protocol Under Review: ${currentItem.submissionId}`;
                    message = `Your research proposal "${currentItem.title}" is now <strong>Under Institutional Review</strong>. Our Ethics and Scientific Committee will evaluate the protocol and provide feedback soon.`;
                } else if (status === 'PUBLISHED') {
                    subject = `Congratulations! Research Published: ${currentItem.submissionId}`;
                    message = `We are pleased to inform you that your research "${currentItem.title}" has been <strong>SUCCESSFULLY PUBLISHED</strong> in the Amanuel Mental Specialized Hospital repository.`;
                } else if (status === 'REJECTED') {
                    subject = `Research Status Update: ${currentItem.submissionId}`;
                    message = `We regret to inform you that your research proposal "${currentItem.title}" was <strong>NOT APPROVED</strong> in its current form. Please check the institutional portal for any reviewer comments or feedback.`;
                } else if (status === 'APPROVED') {
                    subject = `Institutional Approval Granted: ${currentItem.submissionId}`;
                    message = `Your research protocol "${currentItem.title}" has been <strong>OFFICIALLY APPROVED</strong> by the AMSH review board. You may now proceed with the next steps of your institutional research protocol.`;
                }

                await transporter.sendMail({
                    from: `"AMSH Institutional" <${user}>`,
                    to: currentItem.email,
                    bcc: 'info@amsh.gov.et',
                    subject: subject,
                    html: `
                        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
                            <div style="background: #1B4F8A; color: #fff; padding: 20px; text-align: center;">
                                <h2 style="margin: 0;">Institutional Research Portal</h2>
                            </div>
                            <div style="padding: 30px;">
                                <p>Dear ${currentItem.investigatorName || 'Investigator'},</p>
                                <p>${message}</p>
                                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                                <p><strong>Tracking ID:</strong> ${currentItem.submissionId}</p>
                                <p><strong>Current Status:</strong> ${statusText}</p>
                                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                                <p>You can track the progress of your submission anytime using your tracking ID on the AMSH Research Portal.</p>
                                <p style="font-size: 12px; color: #888;">This is an automated institutional notification. Please do not reply directly to this email.</p>
                            </div>
                        </div>
                    `,
                });
                console.log(`✅ HMSH Notification: Sent to ${currentItem.email} via ${host}:${port}`);
            } catch (err: any) {
                console.error('❌ HMSH Notification Error:', err.message);
            }
        })();
    } catch (error) {
        console.error('❌ AMSH: PATCH Status Error:', error);
        res.status(500).json({ error: 'Failed to update research status.' });
    }
});

// PUT /api/research/:id - Update research details (Admin)
router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'RESEARCH_ADMIN'), async (req: AuthRequest, res: Response) => {
    upload(req, res, async (err) => {
        if (err) return res.status(400).json({ error: err.message });
        try {
            const { 
                title, abstract, journal, year, category, investigatorName, institution, email, reviewerComments,
                coInvestigators, department, position, phone, status, researchType, studyArea, studyLocation, 
                dataCollectionMethod, participantType, patientsInvolved, supervisorName,
                keywords, sampleSize, correspondingAuthorName, correspondingAuthorEmail,
                ethicsApproved, ethicsCommittee, ethicsApprovalNumber, fundingSource,
                doi, volume, issue, findingsSummary
            } = req.body;
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };

            // Only include fields that are actually defined — undefined fields cause Prisma errors
            const updateData: any = {};
            if (title !== undefined) updateData.title = title;
            if (abstract !== undefined) updateData.abstract = abstract;
            if (journal !== undefined) updateData.journal = journal;
            if (year !== undefined) updateData.year = String(year);
            if (category !== undefined) updateData.category = category;
            if (investigatorName !== undefined) updateData.investigatorName = investigatorName;
            if (institution !== undefined) updateData.institution = institution;
            if (email !== undefined) updateData.email = email;
            if (reviewerComments !== undefined) updateData.reviewerComments = reviewerComments;
            if (coInvestigators !== undefined) updateData.coInvestigators = coInvestigators;
            if (department !== undefined) updateData.department = department;
            if (position !== undefined) updateData.position = position;
            if (phone !== undefined) updateData.phone = phone;
            if (status !== undefined) updateData.status = status;
            if (researchType !== undefined) updateData.researchType = researchType;
            if (studyArea !== undefined) updateData.studyArea = studyArea;
            if (studyLocation !== undefined) updateData.studyLocation = studyLocation;
            if (dataCollectionMethod !== undefined) updateData.dataCollectionMethod = dataCollectionMethod;
            if (participantType !== undefined) updateData.participantType = participantType;
            if (patientsInvolved !== undefined) updateData.patientsInvolved = patientsInvolved === 'true' || patientsInvolved === true;
            if (supervisorName !== undefined) updateData.supervisorName = supervisorName;
            if (keywords !== undefined) updateData.keywords = keywords;
            if (sampleSize !== undefined) updateData.sampleSize = String(sampleSize);
            if (correspondingAuthorName !== undefined) updateData.correspondingAuthorName = correspondingAuthorName;
            if (correspondingAuthorEmail !== undefined) updateData.correspondingAuthorEmail = correspondingAuthorEmail;
            if (ethicsApproved !== undefined) updateData.ethicsApproved = ethicsApproved === 'true' || ethicsApproved === true;
            if (ethicsCommittee !== undefined) updateData.ethicsCommittee = ethicsCommittee;
            if (ethicsApprovalNumber !== undefined) updateData.ethicsApprovalNumber = ethicsApprovalNumber;
            if (fundingSource !== undefined) updateData.fundingSource = fundingSource;
            if (doi !== undefined) updateData.doi = doi;
            if (volume !== undefined) updateData.volume = volume;
            if (issue !== undefined) updateData.issue = issue;
            if (findingsSummary !== undefined) updateData.findingsSummary = findingsSummary;

            if (files && files['proposalPDF']) {
                updateData.publishedProposal = `/uploads/${files['proposalPDF'][0].filename}`;
            }
            if (files && files['ethicalLetter']) {
                updateData.publishedEthical = `/uploads/${files['ethicalLetter'][0].filename}`;
            }

            try {
                const item = await prisma.research.update({
                    where: { id: req.params.id },
                    data: updateData,
                });
                res.json({ research: item });
            } catch (prismaError: any) {
                console.error('❌ Prisma Update Error:', {
                    code: prismaError.code,
                    meta: prismaError.meta,
                    message: prismaError.message,
                    targetId: req.params.id
                });
                throw prismaError;
            }
        } catch (error: any) {
            console.error('❌ AMSH Research Update Failed:', error);
            res.status(500).json({ 
                error: 'Failed to update research details.', 
                detail: error?.message,
                code: error?.code,
                meta: error?.meta
            });
        }
    });
});

// DELETE /api/research/:id - Delete research (Admin)
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'RESEARCH_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        await prisma.research.delete({ where: { id: req.params.id } });
        res.json({ message: 'Research deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete research.' });
    }
});

export default router;
