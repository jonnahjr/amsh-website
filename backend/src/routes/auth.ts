import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../index';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// Helper: Generate tokens
const generateTokens = (userId: string) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });
    const refreshToken = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET!, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
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

        const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

        if (!user || !user.isActive) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
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

export default router;
