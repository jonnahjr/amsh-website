import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AuthRepository } from './auth.repository';
import { UnauthorizedError } from '../../core/errors/app-error';

export class AuthService {
  private repository: AuthRepository;

  constructor() {
    this.repository = new AuthRepository();
  }

  async login(email: string, pass: string) {
    const user = await this.repository.findByEmail(email);
    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedError('Invalid institutional credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedError('Administrative account is currently disabled');
    }

    const token = this.generateToken(user.id, user.role);
    const refreshToken = this.generateRefreshToken(user.id);

    await this.repository.updateRefreshToken(user.id, refreshToken);

    return {
      user: {
        id: user.id, email: user.email, name: user.name, role: user.role
      },
      token,
      refreshToken,
    };
  }

  private generateToken(id: string, role: string) {
    return jwt.sign({ id, role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
  }

  private generateRefreshToken(id: string) {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET || 'refresh_secret', { expiresIn: '7d' });
  }
}
