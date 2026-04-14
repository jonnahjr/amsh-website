import { prisma } from '../../core/db/prisma.service';
import { Prisma } from '@prisma/client';

export class PostsRepository {
  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    const include: Prisma.PostInclude = {
      category: true,
    };

    // Only include author if specifically requested or for single post fetch
    // To resolve 500 errors when author records might be missing from legacy DB migrations
    if ((params as any).includeAuthor) {
      include.author = {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      };
    }

    return prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  async findById(id: string) {
    return prisma.post.findUnique({
      where: { id },
      include: {
        category: true,
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.post.findUnique({
      where: { slug },
      include: {
        category: true,
        author: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });
  }

  async create(data: Prisma.PostCreateInput) {
    return prisma.post.create({
      data,
    });
  }

  async update(id: string, data: Prisma.PostUpdateInput) {
    return prisma.post.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.post.delete({
      where: { id },
    });
  }

  async count(where?: Prisma.PostWhereInput) {
    return prisma.post.count({ where });
  }
}
