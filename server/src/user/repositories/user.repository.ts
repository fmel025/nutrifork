import { prisma } from '@Common/database';
import { User } from '@prisma/client';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';

type UpdateUserType = Partial<Omit<User, 'id'>>;

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

  async findOneByUsername(username: string) {
    const user = await prisma.user.findFirst({
      where: { username },
    });

    return user;
  }

  async update(id: string, data: UpdateUserType) {
    const user = await prisma.user.update({
      where: { id },
      data,
    });

    return user;
  }
}

export const userRepository = new UserRepository();
