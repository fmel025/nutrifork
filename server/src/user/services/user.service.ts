import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto';
import { userRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  async create(createUserDto: CreateUserDto) {
    const userCreated = await userRepository.create(createUserDto);
    return userCreated;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }
}
