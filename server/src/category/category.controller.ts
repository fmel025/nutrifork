import { Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('categories')
  async getCategories() {
    return this.categoryService.getCategories();
  }

  @Get('allergies')
  async getAllergies() {
    return this.categoryService.getAllergies();
  }

  @Get('all')
  async getAll() {
    return await this.categoryService.getAll();
  }

  // @Post()
  // async createMany(@Body() createCategories: UploadCategories) {
  //   const { categories } = createCategories;
  //   return await this.categoryService.createMany(categories);
  // }

  // @Post('allergies')
  // async createManyAllergies(@Body() createAllergies: UploadAllergies) {
  //   const { allergies } = createAllergies;
  //   return await this.categoryService.createManyAllergies(allergies);
  // }
}
