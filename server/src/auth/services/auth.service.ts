import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { LoginDto } from '../dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async signIn(email: string, password: string) {
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
    // TODO: Return here the jwt.
    return userFound;
  }

  private async comparePasswords(password: string, encryptedPassword: string) {
    return await bcrypt.compare(password, encryptedPassword);
  }
}
