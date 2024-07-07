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
        users: {
          where: {
            id: userId,
          },
        },
      },
    });
  }

  async findAll(category?: string, userId?: string): Promise<Recipe[]> {
    let where = {};

    if (category) {
      where = {
        categories: {
          has: category,
        },
      };
    }
    return prisma.recipe.findMany({
      where,
      select: {
        id: true,
        name: true,
        image: true,
        categories: true,
        userIDs: true,
        users: {
          where: {
            id: userId,
          },
        },
      },
    }) as unknown as Recipe[];
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
