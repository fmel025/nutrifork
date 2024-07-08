import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from '../dto';
import { recipeRepository } from '../repositories';
import { UserPayload } from '@Common/types';
import { successResponse } from '@Common/utils/success-response';
import { plainToInstance } from 'class-transformer';
import { RecipeResponseDoc } from '../doc/recipe-response.doc';
import axios from 'axios';
import { userRepository } from '@User/repositories/user.repository';

@Injectable()
export class RecipeService {
  async create(createRecipeDto: CreateRecipeDto) {
    return await recipeRepository.createRecipe(createRecipeDto);
  }

  async findAll(category?: string, user?: UserPayload) {
    let recipes = await recipeRepository.findAll(category);

    if (user) {
      recipes = await recipeRepository.findAll(category, user.id);
      recipes = recipes.map((recipe) => ({
        ...recipe,
        userId: user.id,
      }));
    }

    const parsedRecipes = plainToInstance(RecipeResponseDoc, recipes, {
      excludeExtraneousValues: true,
    });

    return successResponse(parsedRecipes);
  }

  async findOne(id: string, user?: UserPayload) {
    if (!user) {
      const recipe = await recipeRepository.findById(id);
      delete recipe.userIDs;
      const transformedRecipe = plainToInstance(RecipeResponseDoc, recipe, {
        excludeExtraneousValues: true,
      });
      return successResponse(transformedRecipe);
    }

    const recipe = await recipeRepository.findById(id, user.id);

    const transformedRecipe = plainToInstance(
      RecipeResponseDoc,
      { ...recipe, userId: user.id },
      {
        excludeExtraneousValues: true,
      },
    );

    return successResponse(transformedRecipe);
  }

  async getRecommendations(user: UserPayload) {
    const { id } = user;

    try {
      const response = await axios.get<{ recommendations: string[] }>(
        `${process.env.RECOMMENDATION_API_URL}/recommend?user_id=${id}`,
      );

      const data = response.data.recommendations as string[];

      if (data.length > 0) {
        const recipe = await recipeRepository.findById(data[0]);
        return successResponse(
          plainToInstance(RecipeResponseDoc, recipe, {
            excludeExtraneousValues: true,
          }),
        );
      }

      const user = await userRepository.findOneById(id);

      const recipes = await recipeRepository.findByCategoriesForUser(
        user.preferences,
      );

      return successResponse(
        plainToInstance(RecipeResponseDoc, recipes, {
          excludeExtraneousValues: true,
        }),
      );
    } catch (err) {
      console.error(`Error fetching recommendations: ${err.message}`);

      const user = await userRepository.findOneById(id);

      const recipes = await recipeRepository.findByCategoriesForUser(
        user.preferences,
      );

      return successResponse(
        plainToInstance(RecipeResponseDoc, recipes, {
          excludeExtraneousValues: true,
        }),
      );
    }
  }
}
