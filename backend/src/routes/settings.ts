import { Router, Request, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../index';

const router = Router();

// GET /api/settings - Public (returns all settings as key-value object)
router.get('/', async (req: Request, res: Response) => {
    try {
        const settings = await prisma.siteSetting.findMany();
        const settingsMap: Record<string, string> = {};
        settings.forEach(s => { settingsMap[s.key] = s.value; });
        res.json({ settings: settingsMap });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch settings.' });
    }
});

// GET /api/settings/group/:group
router.get('/group/:group', async (req: Request, res: Response) => {
    try {
        const settings = await prisma.siteSetting.findMany({ where: { group: req.params.group } });
        res.json({ settings });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch settings.' });
    }
});

// PUT /api/settings - Update multiple settings (Admin)
router.put('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const { settings } = req.body; // { key: value, key2: value2 }

        const updates = Object.entries(settings).map(([key, value]) =>
            prisma.siteSetting.upsert({
                where: { key },
                update: { value: String(value) },
                create: { key, value: String(value), label: key, type: 'text', group: 'general' },
            })
        );

        await prisma.$transaction(updates);
        res.json({ message: 'Settings updated successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update settings.' });
    }
});

// PUT /api/settings/:key - Update single setting
router.put('/:key', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const { value, label, type, group } = req.body;
        const setting = await prisma.siteSetting.upsert({
            where: { key: req.params.key },
            update: { value, label, type, group },
            create: { key: req.params.key, value, label: label || req.params.key, type: type || 'text', group: group || 'general' },
        });
        res.json({ setting });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update setting.' });
    }
});

export default router;
