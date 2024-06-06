import { prisma } from '@Common/database';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

class UserRepository {
  async create(user: CreateUserDto) {
    const createdUser = await prisma.user.create({
      data: user,
    });

    return createdUser;
  }
}

export const userRepository = new UserRepository();
