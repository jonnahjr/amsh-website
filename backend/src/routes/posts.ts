import { Router, Request, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../index';

const router = Router();

// GET /api/posts - Public listing
router.get('/', async (req: Request, res: Response) => {
    try {
        const { type, category, page = '1', limit = '10', search, status } = req.query;
        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

        const where: any = {
            status: status || 'PUBLISHED',
        };
        if (type) where.type = type;
        if (category) where.category = { slug: category };
        if (search) {
            where.OR = [
                { title: { contains: search as string, mode: 'insensitive' } },
                { excerpt: { contains: search as string, mode: 'insensitive' } },
            ];
        }

        const [posts, total] = await Promise.all([
            prisma.post.findMany({
                where,
                skip,
                take: parseInt(limit as string),
                orderBy: { publishedAt: 'desc' },
                include: {
                    author: { select: { name: true, avatar: true } },
                    category: true,
                },
            }),
            prisma.post.count({ where }),
        ]);

        res.json({
            posts,
            pagination: {
                page: parseInt(page as string),
                limit: parseInt(limit as string),
                total,
                pages: Math.ceil(total / parseInt(limit as string)),
            },
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch posts.' });
    }
});

// GET /api/posts/:slug - Single post
router.get('/:slug', async (req: Request, res: Response) => {
    try {
        const post = await prisma.post.findUnique({
            where: { slug: req.params.slug },
            include: {
                author: { select: { name: true, avatar: true } },
                category: true,
            },
        });
        if (!post) return res.status(404).json({ error: 'Post not found.' });

        // Increment views
        await prisma.post.update({ where: { id: post.id }, data: { views: { increment: 1 } } });

        res.json({ post });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch post.' });
    }
});

// POST /api/posts - Create post (Admin)
router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'EDITOR'), async (req: AuthRequest, res: Response) => {
    try {
        const { title, slug, excerpt, content, featuredImage, type, status, categoryId, tags, metaTitle, metaDesc, eventDate, eventLocation } = req.body;

        const post = await prisma.post.create({
            data: {
                title, slug, excerpt, content, featuredImage,
                type: type || 'BLOG',
                status: status || 'DRAFT',
                authorId: req.user!.id,
                categoryId,
                tags: tags || [],
                metaTitle, metaDesc,
                eventDate: eventDate ? new Date(eventDate) : undefined,
                eventLocation,
                publishedAt: status === 'PUBLISHED' ? new Date() : undefined,
            },
        });
        res.status(201).json({ post });
    } catch (error: any) {
        if (error.code === 'P2002') return res.status(409).json({ error: 'Slug already exists.' });
        res.status(500).json({ error: 'Failed to create post.' });
    }
});

// PUT /api/posts/:id - Update post (Admin)
router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'EDITOR'), async (req: AuthRequest, res: Response) => {
    try {
        const { title, slug, excerpt, content, featuredImage, type, status, categoryId, tags, metaTitle, metaDesc, eventDate, eventLocation } = req.body;

        const post = await prisma.post.update({
            where: { id: req.params.id },
            data: {
                title, slug, excerpt, content, featuredImage,
                type, status, categoryId,
                tags: tags || [],
                metaTitle, metaDesc,
                eventDate: eventDate ? new Date(eventDate) : undefined,
                eventLocation,
                publishedAt: status === 'PUBLISHED' ? new Date() : undefined,
            },
        });
        res.json({ post });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update post.' });
    }
});

// DELETE /api/posts/:id - Delete post (Admin)
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        await prisma.post.delete({ where: { id: req.params.id } });
        res.json({ message: 'Post deleted.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete post.' });
    }
});

export default router;
