import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/user.service';
import { LoginDto } from '../dto';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from 'src/jwt.constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
  ) {}
  async signIn(user: LoginDto) {
    try {
      const userFound = await this.userService.findOneByEmail(user.email);

      if (!userFound) {
        throw new NotFoundException('User not found');
      }

      const isMatch = this.comparePasswords(user.password, userFound.password);
      if (!isMatch) {
        throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
      }

      const payload = { username: userFound.name, userId: userFound.id };

      return {
        user,
        access_token: await this.jwt.signAsync(payload),
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  private async comparePasswords(password: string, encryptedPassword: string) {
    return await bcrypt.compare(password, encryptedPassword);
  }

  async verifytoken(token: string) {
    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: jwtConstants.secret,
      });

      return {
        userId: payload.userId,
        username: payload.username,
      };
    } catch (err) {
      throw new UnauthorizedException(err.message);
    }
  }
}
