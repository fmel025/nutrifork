import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto';
import { userRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UploadImageService } from '@UploadImage/services';
import { UserPayload } from '@Common/types';
import { UpdateUserDto } from '@User/dto';
import { successResponse } from '@Common/utils/success-response';
import { User } from '@prisma/client';
import { RecipeService } from 'src/recipe/services';
import { plainToInstance } from 'class-transformer';
// import { prisma } from '@Common/database';
import { RecipeResponseDoc } from '../../recipe/doc/recipe-response.doc';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly uploadImageService: UploadImageService,
    private readonly recipeService: RecipeService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, username } = createUserDto;

    await this.validateEmail(email);
    await this.validateUsername(username);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    createUserDto.password = hashedPassword;

    const newUser = await userRepository.create(createUserDto);

    const payload = { id: newUser.id, email: newUser.email };

    // prisma.user.update({
    //   where: { id: newUser.id },
    //   data: {
    //     favorites: {
    //       connect: {
    //         id: 'a',
    //       },
    //     },
    //   },
    // });

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async update(loggedUser: UserPayload, data: UpdateUserDto) {
    const { email, password, username } = data;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      data.password = hashedPassword;
    }

    const user = await userRepository.findOneById(loggedUser.id);

    if (email && user.email !== email) {
      await this.validateEmail(email);
    }

    if (username && user.username !== username) {
      await this.validateUsername(username);
    }

    const updatedUser = await userRepository.update(loggedUser.id, data);

    delete updatedUser.password;
    delete updatedUser.avatarPublicId;

    return successResponse(updatedUser, 'User updated successfully');
  }

  async updateAvatar(file: Express.Multer.File, user: UserPayload) {
    if (!file.mimetype.startsWith('image/') || file.mimetype === 'image/gif') {
      throw new BadRequestException(
        'Invalid file type. Only non-GIF images are allowed.',
      );
    }

    const loggedUser = await this.findOneById(user.id);

    if (!loggedUser) {
      throw new ConflictException('User not found');
    }

    const deleteOldAvatar =
      loggedUser.avatar && loggedUser.avatarPublicId
        ? this.uploadImageService.deleteFile(loggedUser.avatarPublicId)
        : Promise.resolve();

    const uploadNewAvatar = this.uploadImageService.uploadFile(file, 'avatar');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, cloudinaryResponse] = await Promise.all([
      deleteOldAvatar,
      uploadNewAvatar,
    ]);

    const { public_id, secure_url } = cloudinaryResponse;

    await userRepository.update(loggedUser.id, {
      avatar: secure_url,
      avatarPublicId: public_id,
    });

    const responsePayload: Record<string, string> = {
      avatar: secure_url,
      avatarPublicId: public_id,
    };

    return successResponse(responsePayload, 'Avatar updated successfully');
  }

  async getProfileInfo(loggedUser: UserPayload) {
    const user = await userRepository.findOneById(loggedUser.id);

    delete user.password;
    delete user.avatarPublicId;

    return successResponse<User>(user, 'User found successfully');
  }

  async findOneByEmail(email: string) {
    return await userRepository.findOneByEmail(email);
  }

  async findOneById(id: string) {
    return await userRepository.findOneById(id);
  }

  private async validateEmail(email: string): Promise<void> {
    const existingUser = await userRepository.findOneByEmail(email);

    if (existingUser) {
      throw new ConflictException(`The email ${email} is already registered`);
    }
  }

  private async validateUsername(username: string): Promise<void> {
    const existingUser = await userRepository.findOneByUsername(username);

    if (existingUser) {
      throw new ConflictException(
        `The username ${username} is already registered`,
      );
    }
  }

  async findAllFavoriteRecipes(userId: string) {
    const recipes = await userRepository.findAllFavoritedByUser(userId);
    const recipesWithUserId = recipes.map((recipe) => ({ ...recipe, userId }));
    const parsedRecipes = plainToInstance(
      RecipeResponseDoc,
      recipesWithUserId,
      {
        excludeExtraneousValues: true,
      },
    );
    return successResponse(
      parsedRecipes,
      'Favorite recipes retrieved successfully',
      200,
    );
  }

  async setFavoriteRecipe(recipeId: string, user: UserPayload) {
    const loggedUserResponse = this.findOneById(user.id);
    const recipeResponse = this.recipeService.findOne(recipeId);

    const [loggedUser, recipe] = await Promise.all([
      loggedUserResponse,
      recipeResponse,
    ]);

    if (!loggedUser) {
      throw new NotFoundException('User not found');
    }

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    const isRecipeFavorite: boolean = loggedUser.favoriteIDs.includes(recipeId);

    if (!isRecipeFavorite)
      await userRepository.setUserFavoriteRecipe(loggedUser.id, recipe.data.id);
    else
      await userRepository.unSetFavoriteRecipe(loggedUser.id, recipe.data.id);

    return successResponse(
      { isFavorite: !isRecipeFavorite },
      `Recipe ${!isRecipeFavorite ? 'added to' : 'removed from'} favorites`,
    );
  }
}
