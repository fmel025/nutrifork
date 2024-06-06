import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { userRepository } from 'src/user/repositories/user.repository';

@Injectable()
export class AuthService {
  async create(createUserDto: CreateUserDto) {
    const userCreated = await userRepository.create(createUserDto);
    return userCreated;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }
}
