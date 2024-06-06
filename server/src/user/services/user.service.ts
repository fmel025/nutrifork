import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto';
import { userRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    const userCreated = await userRepository.create(createUserDto);
    return userCreated;
  }

  findOneByEmail(email: string) {
    return userRepository.findOneByEmail(email);
  }

  findIdOfUser(email: string) {
    return userRepository.findId(email);
  }
}
