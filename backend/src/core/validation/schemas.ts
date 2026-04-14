import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  slug: z.string().min(5),
  excerpt: z.string().max(500).optional(),
  content: z.string().min(20, 'Content is too short'),
  featuredImage: z.string().url().optional(),
  type: z.enum(['BLOG', 'EVENT', 'NEWS']).default('BLOG'),
  categoryId: z.string().uuid().optional(),
  isFeatured: z.boolean().default(false),
  status: z.enum(['PUBLISHED', 'DRAFT']).default('DRAFT'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
