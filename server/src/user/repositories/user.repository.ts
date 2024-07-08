import { prisma } from '@Common/database';
import { UpdateUserType } from '@User/types';
import { CreateUserDto } from '@Auth/dto';
import { UpdateUserDto } from '@User/dto';
import { Recipe } from '@prisma/client';

// Used to make the connections between the ORM/ODM (DB) with our API
// Without exposing this methods
class UserRepository {
  async create(user: CreateUserDto) {
    const createdUser = await prisma.user.create({
      data: user,
    });

    delete createdUser.password;

    return createdUser;
  }

  async findOneById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: { email, deleted: { not: true } },
    });
    return user;
  }

  async findOneByUsername(username: string) {
    const user = await prisma.user.findFirst({
      where: { username, deleted: { not: true } },
    });

    return user;
  }

  async update(id: string, data: UpdateUserType | UpdateUserDto) {
    let extra = {};

    if (data?.preferences) {
      extra = {
        ...extra,
        preferences: {
          set: data.preferences,
        },
      };
    }

    if (data?.allergies) {
      extra = {
        ...extra,
        allergies: {
          set: data.allergies,
        },
      };
    }
    const user = await prisma.user.update({
      where: { id },
      data: {
        ...data,
        ...extra,
      },
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

  async setUserFavoriteRecipe(userId: string, recipeId: string) {
    const user = await prisma.user.update({
      where: { id: userId },
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

  async unSetFavoriteRecipe(userId: string, recipeId: string) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        favorites: {
          disconnect: { id: recipeId },
        },
      },
      include: {
        favorites: true,
      },
    });
  }

  async delete(id: string) {
    await prisma.user.update({
      where: { id },
      data: {
        deleted: true,
      },
    });
  }
}

// We use singleton for repositories as convention
export const userRepository = new UserRepository();
