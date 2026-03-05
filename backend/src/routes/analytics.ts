import { Router, Request, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../index';

const router = Router();

// Analytics overview
router.get('/overview', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const [
            totalPosts, totalDoctors, totalJobs,
            totalCourses, totalAppointments, totalMessages, totalSubscribers,
            totalCpdRegistrations, totalFormSubmissions,
            totalDepartments, totalServices,
            researchStats,
            cpdRegistrationsByCategory,
            attachmentSubmissions,
            recentPosts, recentApplications, recentAppointments
        ] = await Promise.all([
            prisma.post.count({ where: { status: 'PUBLISHED' } }),
            prisma.doctor.count({ where: { isActive: true } }),
            prisma.job.count({ where: { status: 'OPEN' } }),
            prisma.cPDCourse.count({ where: { status: 'PUBLISHED' } }),
            prisma.appointment.count(),
            prisma.contactMessage.count({ where: { isRead: false } }),
            prisma.newsletterSubscriber.count({ where: { isActive: true } }),
            prisma.cPDRegistration.count(),
            prisma.formSubmission.count(),
            prisma.department.count(),
            prisma.service.count(),
            // Research counts (all statuses)
            prisma.research.groupBy({
                by: ['status'],
                _count: { _all: true }
            }),
            // CPD Breakdown
            prisma.cPDRegistration.groupBy({
                by: ['category'],
                _count: { _all: true }
            }),
            // Fetch all clinical attachments to categorize
            prisma.formSubmission.findMany({
                where: { formId: 'clinical-attachment-form' },
                select: { data: true }
            }),
            prisma.post.findMany({ take: 5, orderBy: { createdAt: 'desc' }, select: { id: true, title: true, type: true, views: true, createdAt: true } }),
            prisma.jobApplication.findMany({ take: 5, orderBy: { createdAt: 'desc' }, select: { id: true, firstName: true, lastName: true, email: true, status: true, createdAt: true } }),
            prisma.appointment.findMany({ take: 5, orderBy: { createdAt: 'desc' }, select: { id: true, firstName: true, lastName: true, department: true, date: true, status: true } }),
        ]);

        // Process research stats
        const researchCounts = {
            total: researchStats.reduce((acc, curr) => acc + curr._count._all, 0),
            published: researchStats.find(s => s.status === 'PUBLISHED')?._count._all || 0,
            pending: researchStats.find(s => s.status === 'PENDING')?._count._all || 0,
        };

        // Process cpd category counts
        const cpdCategories = {
            government: cpdRegistrationsByCategory.find(c => c.category === 'GOVERNMENT')?._count._all || 0,
            private: cpdRegistrationsByCategory.find(c => c.category === 'PRIVATE')?._count._all || 0,
            personal: cpdRegistrationsByCategory.find(c => c.category === 'PERSONAL')?._count._all || 0,
        };

        // Categorize attachments
        const attachmentCategories = {
            government: 0,
            private: 0,
            personal: 0
        };

        attachmentSubmissions.forEach(sub => {
            try {
                const data = JSON.parse(sub.data);
                if (data.category === 'GOVERNMENT') attachmentCategories.government++;
                else if (data.category === 'PRIVATE') attachmentCategories.private++;
                else if (data.category === 'SELF_SPONSORED') attachmentCategories.personal++;
            } catch (e) { }
        });

        res.json({
            stats: {
                totalPosts, totalDoctors, totalJobs,
                totalCourses, totalAppointments, totalMessages,
                totalSubscribers, totalCpdRegistrations, totalFormSubmissions,
                totalResearch: researchCounts.total,
                researchPending: researchCounts.pending,
                totalDepartments,
                totalServices,
                attachmentCategories,
                cpdCategories
            },
            recent: { posts: recentPosts, applications: recentApplications, appointments: recentAppointments },
        });
    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ error: 'Failed to fetch analytics.' });
    }
});

// Track page view
router.post('/track', async (req: Request, res: Response) => {
    try {
        const { path } = req.body;
        const ipAddress = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || req.socket.remoteAddress;
        await prisma.pageView.create({
            data: { path, ipAddress, userAgent: req.headers['user-agent'], referer: req.headers.referer },
        });
        res.status(201).json({ tracked: true });
    } catch (error) {
        res.status(201).json({ tracked: false });
    }
});

export default router;
