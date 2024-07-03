import { Recipe } from '@prisma/client';
import { CreateRecipeDto } from '../dto';
import { prisma } from '@Common/database';

export class RecipeRepository {
  async createRecipe(data: CreateRecipeDto): Promise<Recipe> {
    return prisma.recipe.create({
      data,
    });
  }

  async findById(id: string, userId?: string): Promise<Recipe> {
    return prisma.recipe.findUnique({
      where: { id },
      include: {
        rating: {
          where: {
            userId,
          },
        },
      },
    });
  }

  async findAll(): Promise<Recipe[]> {
    return prisma.recipe.findMany();
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

  async findByCategories(categories: string[]) {
    if (categories.length === 0) {
      return [];
    }

    return prisma.recipe.findMany({
      where: {
        categories: {
          hasSome: categories,
        },
      },
    });
  }
}

export const recipeRepository: RecipeRepository = new RecipeRepository();
