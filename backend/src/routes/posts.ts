import { Router, Request, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../index';

const router = Router();

// GET /api/posts - Public listing
router.get('/', async (req: Request, res: Response) => {
    try {
        const { type, category, page = '1', limit = '10', search, status, isFeatured } = req.query;
        const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

        const where: any = {};

        // If status is 'ALL' (admin request), show everything; otherwise default to PUBLISHED
        if (status && status !== 'ALL') {
            where.status = status;
        } else if (!status) {
            where.status = 'PUBLISHED';
        }
        // status === 'ALL' → no status filter → returns everything

        if (type) where.type = type;
        if (category) where.category = { slug: category };
        if (req.query.id) where.id = req.query.id;
        if (isFeatured !== undefined) where.isFeatured = isFeatured === 'true';

        if (search) {
            where.OR = [
                { title: { contains: search as string, mode: 'insensitive' } },
                { excerpt: { contains: search as string, mode: 'insensitive' } },
                { content: { contains: search as string, mode: 'insensitive' } },
            ];
        }

        const [posts, total] = await Promise.all([
            prisma.post.findMany({
                where,
                skip,
                take: parseInt(limit as string),
                orderBy: { createdAt: 'desc' },
                include: {
                    author: { select: { name: true, avatar: true } },
                    category: true,
                },
            }),
            prisma.post.count({ where }),
        ]);

        res.json({
            posts,
            total,
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
        console.error('Fetch post error:', error);
        res.status(500).json({ error: 'Failed to fetch post.' });
    }
});

// GET /api/posts/id/:id - Fetch by ID
router.get('/id/:id', async (req: Request, res: Response) => {
    try {
        const post = await prisma.post.findUnique({
            where: { id: req.params.id },
            include: {
                author: { select: { name: true, avatar: true } },
                category: true,
            },
        });
        if (!post) return res.status(404).json({ error: 'Post not found.' });
        res.json({ post });
    } catch (error) {
        console.error('Fetch post by ID error:', error);
        res.status(500).json({ error: 'Failed to fetch post.' });
    }
});

// POST /api/posts - Create post (Admin)
router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'EDITOR', 'NEWS_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const { title, slug, excerpt, content, featuredImage, type, status, categoryId, tags, metaTitle, metaDesc, metaDescription, eventDate, eventLocation, isFeatured, gallery } = req.body;

        const validEventDate = eventDate ? new Date(eventDate) : undefined;
        const post = await prisma.post.create({
            data: {
                title, slug, excerpt, content, featuredImage,
                type: type || 'BLOG',
                status: status || 'DRAFT',
                authorId: req.user!.id,
                categoryId: categoryId || null,
                tags: Array.isArray(tags) ? JSON.stringify(tags) : (tags || null),
                metaTitle,
                metaDesc: metaDesc || metaDescription,
                eventDate: (validEventDate && !isNaN(validEventDate.getTime())) ? validEventDate : undefined,
                eventLocation,
                isFeatured: !!isFeatured,
                gallery: Array.isArray(gallery) ? JSON.stringify(gallery) : gallery,
                publishedAt: status === 'PUBLISHED' ? new Date() : undefined,
            },
        });
        res.status(201).json({ post });
    } catch (error: any) {
        console.error('Create post error:', error);
        if (error.code === 'P2002') return res.status(409).json({ error: 'Slug already exists.' });
        res.status(500).json({ error: 'Failed to create post.' });
    }
});

// PUT /api/posts/:id - Update post (Admin)
router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'EDITOR', 'NEWS_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const { title, slug, excerpt, content, featuredImage, type, status, categoryId, tags, metaTitle, metaDesc, metaDescription, eventDate, eventLocation, isFeatured, gallery } = req.body;

        const validEventDate = eventDate ? new Date(eventDate) : undefined;
        const post = await prisma.post.update({
            where: { id: req.params.id },
            data: {
                title, slug, excerpt, content, featuredImage,
                type, status,
                categoryId: categoryId || null,
                tags: Array.isArray(tags) ? JSON.stringify(tags) : (tags || null),
                metaTitle,
                metaDesc: metaDesc || metaDescription,
                eventDate: (validEventDate && !isNaN(validEventDate.getTime())) ? validEventDate : undefined,
                eventLocation,
                isFeatured: !!isFeatured,
                gallery: Array.isArray(gallery) ? JSON.stringify(gallery) : gallery,
                publishedAt: status === 'PUBLISHED' ? new Date() : undefined,
            },
        });
        res.json({ post });
    } catch (error: any) {
        console.error('Update post error:', error);
        if (error.code === 'P2025') return res.status(404).json({ error: 'Post not found.' });
        if (error.code === 'P2002') return res.status(409).json({ error: 'Slug already exists.' });
        res.status(500).json({ error: 'Failed to update post.' });
    }
});

// DELETE /api/posts/:id - Delete post (Admin)
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN', 'NEWS_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        await prisma.post.delete({ where: { id: req.params.id } });
        res.json({ message: 'Post deleted.' });
    } catch (error: any) {
        console.error('Delete post error:', error);
        if (error.code === 'P2025') return res.status(404).json({ error: 'Post not found.' });
        res.status(500).json({ error: 'Failed to delete post.' });
    }
});

export default router;
