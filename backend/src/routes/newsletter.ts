import { Router, Request, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../index';

const router = Router();

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

export default router;
