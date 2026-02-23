import { Router, Request, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { prisma } from '../index';
import bcrypt from 'bcryptjs';

const router = Router();

// GET /api/users - Admin only
router.get('/', authenticate, authorize('SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, email: true, name: true, role: true, avatar: true, isActive: true, lastLogin: true, createdAt: true },
            orderBy: { createdAt: 'desc' },
        });
        res.json({ users });
    } catch (error) { res.status(500).json({ error: 'Failed to fetch users.' }); }
});

// POST /api/users - Create admin user
router.post('/', authenticate, authorize('SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const { email, password, name, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await prisma.user.create({
            data: { email: email.toLowerCase(), password: hashedPassword, name, role },
            select: { id: true, email: true, name: true, role: true, createdAt: true },
        });
        res.status(201).json({ user });
    } catch (error: any) {
        if (error.code === 'P2002') return res.status(409).json({ error: 'Email already exists.' });
        res.status(500).json({ error: 'Failed to create user.' });
    }
});

// PUT /api/users/:id
router.put('/:id', authenticate, authorize('SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        const { name, role, isActive, avatar } = req.body;
        const user = await prisma.user.update({
            where: { id: req.params.id },
            data: { name, role, isActive, avatar },
            select: { id: true, email: true, name: true, role: true, isActive: true },
        });
        res.json({ user });
    } catch (error) { res.status(500).json({ error: 'Failed to update user.' }); }
});

// DELETE /api/users/:id
router.delete('/:id', authenticate, authorize('SUPER_ADMIN'), async (req: AuthRequest, res: Response) => {
    try {
        if (req.params.id === req.user!.id) return res.status(400).json({ error: 'Cannot delete your own account.' });
        await prisma.user.delete({ where: { id: req.params.id } });
        res.json({ message: 'User deleted.' });
    } catch (error) { res.status(500).json({ error: 'Failed to delete user.' }); }
});

export default router;
