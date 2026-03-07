import { Router, Request, Response } from 'express';
import { prisma } from '../index';

const router = Router();

/**
 * GET /api/facebook/posts
 * Fetches latest posts from the configured Facebook Page
 */
router.get('/posts', async (req: Request, res: Response) => {
    try {
        const { limit = '10', after = '' } = req.query;

        // Fetch credentials from settings
        const settings = await prisma.siteSetting.findMany({
            where: {
                key: { in: ['facebook_page_id', 'facebook_access_token', 'facebook_integration_enabled'] }
            }
        });

        const settingsMap: Record<string, string> = {};
        settings.forEach(s => { settingsMap[s.key] = s.value; });

        const isEnabled = settingsMap['facebook_integration_enabled'] === 'true';
        let pageId = settingsMap['facebook_page_id'];
        const accessToken = settingsMap['facebook_access_token'];

        // Extract ID if a URL was pasted
        if (pageId?.includes('1000')) {
            const match = pageId.match(/1000\d+/);
            if (match) pageId = match[0];
        }

        // If credentials missing or integration off, return mock data
        if (!isEnabled || !pageId || !accessToken || accessToken.length < 10) {
            return res.json({
                data: getMockFacebookPosts(),
                paging: { next: null },
                isMock: true,
                message: "Please provide a valid Facebook Access Token in Admin Settings to see live posts."
            });
        }

        const fbUrl = `https://graph.facebook.com/v18.0/${pageId}/posts?fields=id,message,created_time,full_picture,permalink_url,attachments{media,description,type,url}&limit=${limit}&after=${after}&access_token=${accessToken}`;
        const response = await fetch(fbUrl);
        const data = await response.json() as any;

        if (data.error) {
            return res.status(502).json({
                error: 'Facebook API reported an error',
                data: getMockFacebookPosts(),
                isMock: true
            });
        }

        // Attach internal slugs for existing posts
        if (data.data) {
            const externalIds = data.data.map((p: any) => p.id);
            const internalPosts = await (prisma.post as any).findMany({
                where: { externalId: { in: externalIds } },
                select: { externalId: true, slug: true }
            });

            const slugMap: Record<string, string> = {};
            internalPosts.forEach((p: any) => { slugMap[p.externalId] = p.slug; });

            data.data = data.data.map((p: any) => ({
                ...p,
                internalSlug: slugMap[p.id] || null
            }));
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Facebook posts' });
    }
});

/**
 * POST /api/facebook/sync
 * Manually trigger sync or called by cron
 */
router.post('/sync', async (req: Request, res: Response) => {
    try {
        const settings = await prisma.siteSetting.findMany({
            where: {
                key: { in: ['facebook_page_id', 'facebook_access_token', 'facebook_integration_enabled'] }
            }
        });

        const settingsMap: Record<string, string> = {};
        settings.forEach(s => { settingsMap[s.key] = s.value; });

        if (settingsMap['facebook_integration_enabled'] !== 'true') {
            return res.status(400).json({ error: 'Facebook integration is deactivated' });
        }

        const pageId = settingsMap['facebook_page_id'];
        const accessToken = settingsMap['facebook_access_token'];

        if (!accessToken || accessToken.length < 10) {
            return res.status(400).json({ error: 'Please enter your Facebook Access Token in the settings before syncing.' });
        }

        const fbUrl = `https://graph.facebook.com/v18.0/${pageId}/posts?fields=id,message,created_time,full_picture,permalink_url&limit=20&access_token=${accessToken}`;
        const response = await fetch(fbUrl);
        const fbData = await response.json() as any;

        if (fbData.error) throw new Error(JSON.stringify(fbData.error));

        const fbPosts = fbData.data || [];
        let createdCount = 0;

        const adminUser = await prisma.user.findFirst({ where: { role: 'SUPER_ADMIN' } }) || await prisma.user.findFirst();

        for (const fbPost of fbPosts) {
            const existing = await (prisma.post as any).findUnique({ where: { externalId: fbPost.id } });
            if (existing) continue;

            const text = fbPost.message || 'Facebook Update';
            const title = text.split('\n')[0].slice(0, 80) || 'Facebook Update';
            const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            const slug = `${baseSlug}-${fbPost.id.slice(-6)}`;

            await (prisma.post as any).create({
                data: {
                    title,
                    slug,
                    content: fbPost.message || '',
                    excerpt: (fbPost.message || '').slice(0, 160),
                    featuredImage: fbPost.full_picture,
                    status: 'PUBLISHED',
                    publishedAt: new Date(fbPost.created_time),
                    externalId: fbPost.id,
                    type: 'BLOG',
                    authorId: adminUser?.id || '',
                }
            });
            createdCount++;
        }

        res.json({ success: true, processed: fbPosts.length, imported: createdCount });
    } catch (error: any) {
        console.error('FB Sync Error:', error);

        // If it looks like a Facebook JSON error string, parse it
        try {
            const fbError = JSON.parse(error.message);
            if (fbError && fbError.message) {
                return res.status(400).json({ error: fbError.message, details: fbError });
            }
        } catch {
            // Not JSON
        }

        res.status(500).json({ error: 'Sync failed', details: error.message });
    }
});

function getMockFacebookPosts() {
    return [
        {
            id: "sync_mock_1",
            message: "Our dedicated team at Amanuel Mental Specialized Hospital continues to provide world-class psychiatric care and rehabilitation services. We are committed to mental wellness for all. #AmanuelHospital #MentalHealthEthiopia",
            created_time: new Date().toISOString(),
            full_picture: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
            permalink_url: "https://www.facebook.com/AmanuelHospital",
            attachments: { data: [{ type: "photo", media: { image: { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800" } } }] }
        },
        {
            id: "sync_mock_2",
            message: "Education is key! Today we hosted a workshop on managing childhood behavioral disorders for parents and guardians. Together, we can build a healthier future. 🏥✨",
            created_time: new Date(Date.now() - 86400000).toISOString(),
            full_picture: "https://images.unsplash.com/photo-1576091160550-2173dad99961?auto=format&fit=crop&q=80&w=800",
            permalink_url: "https://www.facebook.com/AmanuelHospital",
            attachments: { data: [{ type: "photo", media: { image: { src: "https://images.unsplash.com/photo-1576091160550-2173dad99961?auto=format&fit=crop&q=80&w=800" } } }] }
        }
    ];
}

export default router;
