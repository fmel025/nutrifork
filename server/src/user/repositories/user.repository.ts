import { prisma } from '@Common/database';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

class UserRepository {
  async create(user: CreateUserDto) {
    const createdUser = await prisma.user.create({
      data: user,
    });

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

  async findId(email: string) {
    const userId = (await prisma.user.findFirst({ where: { email } })).id;
    return userId;
  }
}

export const userRepository = new UserRepository();
