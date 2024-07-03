import { prisma } from '@Common/database';
import { UpdateUserType } from '@User/types';
import { CreateUserDto } from '@Auth/dto';
import { UpdateUserDto } from '@User/dto';
import { Recipe } from '@prisma/client';

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

  async update(id: string, data: UpdateUserType | UpdateUserDto) {
    const user = await prisma.user.update({
      where: { id },
      data: data as UpdateUserType,
    });

    return user;
  }

  async findAllFavoritedByUser(userId: string): Promise<Recipe[]> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        favorites: true,
      },
    });

    return user.favorites;
  }

  async setUserFavoriteRecipe(recipeId: string) {
    const user = await prisma.user.update({
      where: { id: recipeId },
      data: {
        favorites: {
          connect: { id: recipeId },
        },
      },
      include: {
        favorites: true,
      },
    });

    return user.favorites;
  }
}

export const userRepository = new UserRepository();
