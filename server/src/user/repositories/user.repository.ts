import { prisma } from '@Common/database';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

class UserRepository {
  async create(user: CreateUserDto) {
    const createdUser = await prisma.user.create({
      data: user,
    });

    delete createdUser.password;

    return createdUser;
  }

  async findOneById(id: string) {
    const user = await prisma.user.findFirst({
      where: { id },
    });

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: { email },
    });
    return user;
  }
}

export const userRepository = new UserRepository();
