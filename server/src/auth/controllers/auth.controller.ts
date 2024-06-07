import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Res,
  Get,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, LoginDto } from '../dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/services/user.service';
import { Request, Response } from 'express';
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
  async create(
    @Body() createAuthDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
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
    res.cookie('access_token', access_token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });
    return newUser;
  }

  @ApiOperation({
    summary: 'User Login',
    description:
      'The method is to perform the login of an already registered user',
  })
  @Post('login')
  async signIn(
    @Body() userLogin: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userFound = await this.userService.findOneByEmail(userLogin.email);
    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const result = await this.authService.singIn(userLogin);

    if (result instanceof HttpException) {
      throw result;
    }

    const { access_token } = result;

    res.cookie('access_token', access_token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
    });

    res.status(201).json({
      username: userFound.name,
      email: userFound.email,
    });
  }

  @ApiOperation({
    summary: 'Verify user token',
    description:
      "It is a method to verify a user's token, mainly so that it can be used on the frontend to verify if a user has already logged in.",
  })
  @Get('verify')
  async verifyToken(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    const { access_token } = req.cookies;
    if (!access_token) throw new UnauthorizedException();

    const result = await this.authService.verifytoken(access_token);
    return result;
  }
}
