import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../core/db/prisma.service';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// Helper: Generate tokens
const generateTokens = (userId: string) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
        expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any,
    });
    const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET!, {
        expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '30d') as any,
    });
    return { token, refreshToken };
};

// ============================================================
// POST /api/auth/login
// ============================================================
router.post('/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });

        if (!user || !user.isActive) {
            console.log(`[AUTH] Login failed: User ${email} not found or inactive`);
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            console.log(`[AUTH] Login failed: Password mismatch for ${email}`);
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const { token, refreshToken } = generateTokens(user.id);

        // Save refresh token
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date(), refreshToken },
        });

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        const { password: _, refreshToken: __, ...safeUser } = user;

        res.json({
            message: 'Login successful',
            user: safeUser,
            token,
            refreshToken,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ============================================================
// POST /api/auth/refresh
// ============================================================
router.post('/refresh', async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) return res.status(401).json({ error: 'Refresh token required.' });

        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as any;
        const user = await prisma.user.findUnique({
            where: { id: decoded.id, refreshToken, isActive: true },
        });

        if (!user) return res.status(401).json({ error: 'Invalid refresh token.' });

        const tokens = generateTokens(user.id);
        await prisma.user.update({ where: { id: user.id }, data: { refreshToken: tokens.refreshToken } });

        res.json(tokens);
    } catch (error) {
        res.status(401).json({ error: 'Invalid refresh token.' });
    }
});

// ============================================================
// POST /api/auth/logout
// ============================================================
router.post('/logout', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        await prisma.user.update({
            where: { id: req.user!.id },
            data: { refreshToken: null },
        });
        res.clearCookie('token');
        res.json({ message: 'Logged out successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ============================================================
// GET /api/auth/me
// ============================================================
router.get('/me', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user!.id },
            select: {
                id: true, email: true, name: true, role: true,
                avatar: true, lastLogin: true, createdAt: true,
            },
        });
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ============================================================
// POST /api/auth/change-password
// ============================================================
router.post('/change-password', authenticate, async (req: AuthRequest, res: Response) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await prisma.user.findUnique({ where: { id: req.user!.id } });

        if (!user) return res.status(404).json({ error: 'User not found.' });

        const isValid = await bcrypt.compare(currentPassword, user.password);
        if (!isValid) return res.status(401).json({ error: 'Current password is incorrect.' });

        if (newPassword.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        await prisma.user.update({ where: { id: user.id }, data: { password: hashedPassword } });

        res.json({ message: 'Password changed successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ============================================================
// GET /api/auth/init-root-admin (Emergency Access)
// ============================================================
router.get('/init-root-admin', async (req: Request, res: Response) => {
    try {
        const password = 'Jonnahjnr@0945628075YONas';
        const hashedPassword = await bcrypt.hash(password, 12);
        
        const user = await prisma.user.upsert({
            where: { email: 'admin@amsh.gov.et' },
            update: {
                password: hashedPassword,
                role: 'SUPER_ADMIN',
                isActive: true,
                name: 'AMSH Administrator'
            },
            create: {
                email: 'admin@amsh.gov.et',
                password: hashedPassword,
                name: 'AMSH Administrator',
                role: 'SUPER_ADMIN',
                isActive: true
            }
        });
        
        res.send(`
            <div style="font-family: sans-serif; padding: 40px; text-align: center;">
                <h1 style="color: #1B4F8A;">AMSH Root Authorized</h1>
                <p>Administrative identity <b>${user.email}</b> has been synchronized with the institutional vault.</p>
                <p>You may now proceed to the <a href="${process.env.FRONTEND_URL}/admin/login">Command Portal</a>.</p>
            </div>
        `);
    } catch (error: any) {
        res.status(500).json({ error: 'Initialization Failed', detail: error.message });
    }
});

export default router;
