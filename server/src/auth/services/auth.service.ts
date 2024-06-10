import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { LoginDto } from '../dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async signIn(userLoginDto: LoginDto) {
    const { email, password } = userLoginDto;

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

    // TODO: Return here the jwt.
    return {
      user: userLoginDto,
    };
  }

  private async comparePasswords(password: string, encryptedPassword: string) {
    return await bcrypt.compare(password, encryptedPassword);
  }
}
