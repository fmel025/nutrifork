import { JwtAuthGuard } from '@Auth/guards';
import { User } from '@Common/decorators';
import { UserPayload } from '@Common/types';
import { UpdateUserDto } from '@User/dto';
import { UserService } from '@User/services/user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Access user information',
    description: 'Use it to access user account information',
  })
  @Get('profile')
  async getProfileData(@User() loggedUser: UserPayload) {
    return this.userService.getProfileInfo(loggedUser);
  }

  @ApiOperation({
    summary: 'Update user information',
    description: 'Use it to update user account information',
  })
  @Patch()
  async updateUserInfo(
    @User() loggedUser: UserPayload,
    @Body() data: UpdateUserDto,
  ) {
    return await this.userService.update(loggedUser, data);
  }

  @ApiOperation({
    summary: 'Set a recipe as favorite',
    description: 'Use it to set a recipe as favorite',
  })
  @Patch('favorite/:recipeId')
  async setFavoriteRecipe(
    @Param('recipeId') recipeId: string,
    @User() user: UserPayload,
  ) {
    return await this.userService.setFavoriteRecipe(recipeId, user);
  }

  @ApiOperation({
    summary: 'Set a recipe as favorite',
    description: 'Use it to set a recipe as favorite',
  })
  @Get('favorite')
  async getFavoriteRecipes(@User() user: UserPayload) {
    return await this.userService.findAllFavoriteRecipes(user.id);
  }

  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['avatar'],
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Patch('avatar')
  async updateAvatar(
    @UploadedFile()
    file: Express.Multer.File,
    @User() loggedUser: UserPayload,
  ) {
    return await this.userService.updateAvatar(file, loggedUser);
  }
}
