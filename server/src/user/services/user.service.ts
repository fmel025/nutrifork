import { Injectable } from '@nestjs/common';
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
      return newUser;
    } catch (error) {
      console.log(error);
      return new Error('Error creating user');
    }
  }

  findOneByEmail(email: string) {
    return userRepository.findOneByEmail(email);
  }

  findIdOfUser(email: string) {
    return userRepository.findId(email);
  }
}
