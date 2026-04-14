import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError, ForbiddenError } from '../errors/app-error';

export interface UserPayload {
  id: string;
  role: 'ADMIN' | 'EDITOR';
}

// 1. Verify User is Logged In
export const authGuard = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    throw new UnauthorizedError('Authentication token required');
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as UserPayload;
    (req as any).user = decoded;
    next();
  } catch (err) {
    throw new UnauthorizedError('Invalid or expired token');
  }
};

// 2. Role Restriction (Higher Level Guard)
export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as UserPayload;
    if (!user || !roles.includes(user.role)) {
      throw new ForbiddenError('You do not have permission for this institutional action');
    }
    next();
  };
};

export const requireAdmin = requireRole(['ADMIN']);
export const requireEditorBody = requireRole(['ADMIN', 'EDITOR']);
