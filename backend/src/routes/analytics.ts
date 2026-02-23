import { Router, Request, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../index';

const router = Router();

// Analytics overview
router.get('/overview', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const [
            totalPosts, totalDoctors, totalJobs, totalResearch,
            totalCourses, totalAppointments, totalMessages, totalSubscribers,
            recentPosts, recentApplications, recentAppointments
        ] = await Promise.all([
            prisma.post.count({ where: { status: 'PUBLISHED' } }),
            prisma.doctor.count({ where: { isActive: true } }),
            prisma.job.count({ where: { status: 'OPEN' } }),
            prisma.research.count({ where: { status: 'PUBLISHED' } }),
            prisma.cPDCourse.count({ where: { status: 'PUBLISHED' } }),
            prisma.appointment.count(),
            prisma.contactMessage.count({ where: { isRead: false } }),
            prisma.newsletterSubscriber.count({ where: { isActive: true } }),
            prisma.post.findMany({ take: 5, orderBy: { createdAt: 'desc' }, select: { id: true, title: true, type: true, views: true, createdAt: true } }),
            prisma.jobApplication.findMany({ take: 5, orderBy: { createdAt: 'desc' }, select: { id: true, firstName: true, lastName: true, email: true, status: true, createdAt: true } }),
            prisma.appointment.findMany({ take: 5, orderBy: { createdAt: 'desc' }, select: { id: true, firstName: true, lastName: true, department: true, date: true, status: true } }),
        ]);

        res.json({
            stats: { totalPosts, totalDoctors, totalJobs, totalResearch, totalCourses, totalAppointments, totalMessages, totalSubscribers },
            recent: { posts: recentPosts, applications: recentApplications, appointments: recentAppointments },
        });
    } catch (error) {
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
