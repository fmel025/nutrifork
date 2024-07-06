import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { RecipeService } from '../services';
import { CreateRecipeDto } from '../dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@Auth/guards';
import { User } from '@Common/decorators';
import { UserPayload } from '@Common/types';

@ApiTags('Recipe')
@ApiBearerAuth()
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @ApiOperation({
    summary: 'Do not use',
    description: 'Do not use, only for testing purposes',
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }

  @ApiOperation({
    summary: 'Use it to get all recipes',
    description: 'Use it to get all recipes',
  })
  @Get()
  findAll() {
    return this.recipeService.findAll();
  }

  @ApiOperation({
    summary: 'Use it to get all recipes for logged users',
    description: 'Use it to get all recipes for logged users',
  })
  @UseGuards(JwtAuthGuard)
  @Get('user')
  findAllForUsers(@User() user: UserPayload) {
    return this.recipeService.findAll(user);
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
    summary: 'Use it to get one by id',
    description: 'Use it to get one by id',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(id);
  }
}
