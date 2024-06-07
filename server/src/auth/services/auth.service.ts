import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/user.service';
import { LoginDto } from '../dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwt: JwtService,
  ) {}
  async singIn(user: LoginDto) {
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

  async comparePasswords(password: string, passwordHash: string) {
    return await bcrypt.compare(password, passwordHash);
  }

  async verifytoken(token: string){}

}
