import { PostsRepository } from './posts.repository';
import { NotFoundError } from '../../core/errors/app-error';
import { sanitizeHtml } from '../../utils/sanitizer';
import { Prisma } from '@prisma/client';

export class PostsService {
  private repository: PostsRepository;

  constructor() {
    this.repository = new PostsRepository();
  }

  async getAllPosts(query: any) {
    const { page = 1, limit = 10, search, category, type, status, isFeatured } = query;
    const skip = (page - 1) * Number(limit);

    const where: Prisma.PostWhereInput = {};
    
    // 1. Strings/Enums
    if (search) where.OR = [{ title: { contains: search } }, { content: { contains: search } }];
    if (category) where.categoryId = category;
    if (type) where.type = type;
    if (status) where.status = status;

    // 2. Booleans (Parse string params from query)
    if (isFeatured !== undefined) {
      where.isFeatured = isFeatured === 'true';
    }

    const includeAuthor = query.includeAuthor === 'true';

    try {
      console.log('🔍 [POSTS SERVICE] Fetching posts count with where:', JSON.stringify(where));
      const total = await this.repository.count(where);
      console.log('✅ [POSTS SERVICE] Count successful:', total);

      console.log('🔍 [POSTS SERVICE] Fetching posts listing (includeAuthor:', includeAuthor, ')...');
      const posts = await this.repository.findAll({ 
        skip, 
        take: Number(limit), 
        where, 
        orderBy: { createdAt: 'desc' },
        includeAuthor: includeAuthor as any
      } as any);
      console.log('✅ [POSTS SERVICE] Listing successful:', posts.length);

      return { 
        posts, 
        meta: { 
          total, 
          page: Number(page), 
          limit: Number(limit), 
          totalPages: Math.ceil(total / Number(limit)) 
        } 
      };
    } catch (error: any) {
      console.error('💥 [CRITICAL POSTS SERVICE ERROR]:', {
        message: error.message,
        code: error.code,
        meta: error.meta,
        stack: error.stack,
        query: { type, status, category, search }
      });
      throw error;
    }
  }

  async getPostBySlug(slug: string) {
    const post = await this.repository.findBySlug(slug);
    if (!post) throw new NotFoundError(`Institutional post with slug "${slug}" not found`);
    return post;
  }

  async getPostById(id: string) {
    const post = await this.repository.findById(id);
    if (!post) throw new NotFoundError(`Institutional post with id "${id}" not found`);
    return post;
  }

  async createPost(data: any, authorId: string) {
    const sanitizedContent = sanitizeHtml(data.content);
    const sanitizedExcerpt = data.excerpt ? sanitizeHtml(data.excerpt) : '';
    return this.repository.create({
      ...data,
      content: sanitizedContent,
      excerpt: sanitizedExcerpt,
      author: { connect: { id: authorId } }
    });
  }

  async deletePost(id: string) {
    const post = await this.repository.findById(id);
    if (!post) throw new NotFoundError('Institutional post not found');
    return this.repository.delete(id);
  }
}
