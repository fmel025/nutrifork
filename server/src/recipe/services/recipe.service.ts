import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from '../dto';
import { recipeRepository } from '../repositories';
import { UserPayload } from '@Common/types';
import { successResponse } from '@Common/utils/success-response';
import { plainToInstance } from 'class-transformer';
import { RecipeResponseDoc } from '../doc/recipe-response.doc';

@Injectable()
export class RecipeService {
  async create(createRecipeDto: CreateRecipeDto) {
    return await recipeRepository.createRecipe(createRecipeDto);
  }

  async findAll(user?: UserPayload) {
    let recipes = await recipeRepository.findAll();

    if (user) {
      recipes = await recipeRepository.findAll(user.id);
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
      return successResponse(recipe);
    }

    const recipe = await recipeRepository.findById(id, user.id);

    const transformedRecipe = plainToInstance(RecipeResponseDoc, recipe, {
      excludeExtraneousValues: true,
    });

    return successResponse(transformedRecipe);
  }
}
