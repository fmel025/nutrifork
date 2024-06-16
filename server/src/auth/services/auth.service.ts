import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const userFound = await this.userService.findOneByEmail(email);

    if (!userFound) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const doesPasswordMatch = this.comparePasswords(
      password,
      userFound.password,
    );

    if (!doesPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    delete userFound.password;

    return userFound;
  }

  async signIn(email: string, password: string) {
    const user = await this.validateUser(email, password);

    const payload = { email: user.email, id: user.email };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  private async comparePasswords(password: string, encryptedPassword: string) {
    return await bcrypt.compare(password, encryptedPassword);
  }
}
