import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from '../dto';
import { recipeRepository } from '../repositories';

@Injectable()
export class RecipeService {
  async create(createRecipeDto: CreateRecipeDto) {
    return await recipeRepository.createRecipe(createRecipeDto);
  }

  async findAll() {
    return await recipeRepository.findAll();
  }

  async findOne(id: string) {
    const recipe = await recipeRepository.findById(id);
    return recipe;
  }
}
