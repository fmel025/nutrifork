import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto';
import { userRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private readonly jwt: JwtService) {}

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    await this.validateEmail(email);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    createUserDto.password = hashedPassword;

    const newUser = await userRepository.create(createUserDto);

    delete newUser.password;

    return newUser;
  }

  async validateEmail(email: string): Promise<void> {
    const existingUser = await userRepository.findOneByEmail(email);

    if (existingUser) {
      throw new ConflictException(`The email ${email} is already registered`);
    }
  }

  findOneByEmail(email: string) {
    return userRepository.findOneByEmail(email);
  }
}
