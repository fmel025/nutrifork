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
  create(@Body() createAuthDto: CreateUserDto) {
    try {
      return this.userService.create(createAuthDto);
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
