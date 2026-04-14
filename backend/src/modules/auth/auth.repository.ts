import { prisma } from '../../core/db/prisma.service';

export class AuthRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async updateRefreshToken(userId: string, token: string | null) {
    return prisma.user.update({
      where: { id: userId },
      data: { refreshToken: token },
    });
  }
}
