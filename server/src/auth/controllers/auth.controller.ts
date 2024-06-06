import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/services/user.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Create a new user',
    description: 'Use it to create a new user in the database',
  })
  @Post('register')
  async create(@Body() createAuthDto: CreateUserDto) {
    try {
      const userFound = await this.userService.findOneByEmail(
        createAuthDto.email,
      );
      if (userFound) {
        if (userFound.name === createAuthDto.name) {
          throw new HttpException(
            'Username and email already exists',
            HttpStatus.BAD_REQUEST,
          );
        }
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }

      const result = await this.userService.create(createAuthDto);

      if (result instanceof HttpException) {
        throw result;
      }

      const { newUser, access_token } = result;
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
