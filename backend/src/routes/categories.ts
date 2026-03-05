import { Router, Response } from 'express';
import { prisma } from '../index';

const router = Router();

// GET /api/categories
router.get('/', async (_req, res: Response) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' },
        });
        res.json({ categories });
    } catch (error) {
        console.error('Fetch categories error:', error);
        res.status(500).json({ error: 'Failed to fetch categories.' });
    }
});

export default router;
