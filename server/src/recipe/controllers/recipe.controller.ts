import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RecipeService } from '../services';
import { CreateRecipeDto } from '../dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Recipe')
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }

  @Get()
  findAll() {
    return this.recipeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(id);
  }
}
