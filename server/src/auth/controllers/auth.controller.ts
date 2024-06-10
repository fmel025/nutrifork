import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto, LoginDto } from '../dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/services/user.service';
import { AuthService } from '../services/auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: 'Create a new user',
    description: 'Use it to create a new user in the database',
  })
  @Post('register')
  async create(@Body() createAuthDto: CreateUserDto) {
    const result = await this.userService.create(createAuthDto);

    return result;
  }

  @ApiOperation({
    summary: 'User Login',
    description:
      'The method is to perform the login of an already registered user',
  })
  @Post('login')
  async signIn(@Body() userLoginDto: LoginDto) {
    const { email, password } = userLoginDto;
    const result = await this.authService.signIn(email, password);

    return result;
  }
}
