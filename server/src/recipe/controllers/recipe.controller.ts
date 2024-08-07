/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { RecipeService } from '../services';
import { CreateRecipeDto, SearchByCategoryDto } from '../dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@Auth/guards';
import { User } from '@Common/decorators';
import { UserPayload } from '@Common/types';

// Recipes endpoints
@ApiTags('Recipe')
@ApiBearerAuth()
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  // @ApiOperation({
  //   summary: 'Do not use',
  //   description: 'Do not use, only for seeding the recipes purposes',
  // })
  // @Post()
  // @UseGuards(JwtAuthGuard)
  // create(@Body() createRecipeDto: CreateRecipeDto) {
  //   return this.recipeService.create(createRecipeDto);
  // }

  @ApiOperation({
    summary: 'Use it to get all recipes',
    description: 'Use it to get all recipes',
  })
  @Get()
  findAll(@Query() query: SearchByCategoryDto) {
    const { category } = query;
    return this.recipeService.findAll(category);
  }

  @ApiOperation({
    summary: 'Use it to get all recipes for logged users',
    description: 'Use it to get all recipes for logged users',
  })
  @UseGuards(JwtAuthGuard)
  @Get('user')
  findAllForUsers(
    @User() user: UserPayload,
    @Query() query: SearchByCategoryDto,
  ) {
    const { category } = query;
    return this.recipeService.findAll(category, user);
  }

  @ApiOperation({
    summary: 'Use it to get one by id when user is logged',
    description: 'For logged users',
  })
  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  findOneForUsers(@Param('id') id: string, @User() user: UserPayload) {
    return this.recipeService.findOne(id, user);
  }

  @ApiOperation({
    summary: 'Use it to get one recommendation',
    description: 'Use it to get one recommendation (logged users only)',
  })
  @Get('recommendations')
  @UseGuards(JwtAuthGuard)
  recommend(@User() user: UserPayload) {
    return this.recipeService.getRecommendations(user);
  }

  @ApiOperation({
    summary: 'Use it to get one by id',
    description: 'Use it to get one by id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(id);
  }
}
