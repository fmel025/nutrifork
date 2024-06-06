import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto';
import { userRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private readonly jwt: JwtService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const passwordHash = await bcrypt.hash(createUserDto.password, 10);
      createUserDto.password = passwordHash;

      const newUser = await userRepository.create(createUserDto);

      const payload = { username: newUser.name, userId: newUser.id };

      return {
        newUser,
        access_token: await this.jwt.signAsync(payload),
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error creating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOneByEmail(email: string) {
    return userRepository.findOneByEmail(email);
  }

  findIdOfUser(email: string) {
    return userRepository.findId(email);
  }
}
