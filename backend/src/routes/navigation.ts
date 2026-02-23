import { Router, Request, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../index';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const items = await prisma.navItem.findMany({ where: { isActive: true, parentId: null }, orderBy: { order: 'asc' }, include: { children: { where: { isActive: true }, orderBy: { order: 'asc' } } } });
        res.json({ navigation: items });
    } catch (error) { res.status(500).json({ error: 'Failed to fetch navigation.' }); }
});

router.put('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const { items } = req.body;
        await prisma.navItem.deleteMany();
        await prisma.navItem.createMany({ data: items });
        res.json({ message: 'Navigation updated.' });
    } catch (error) { res.status(500).json({ error: 'Failed to update navigation.' }); }
});

export default router;
