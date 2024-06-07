import {
  Injectable,
  NestMiddleware,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { jwtConstants } from 'src/jwt.constants';

@Injectable()
export class AuthRequired implements NestMiddleware {
  constructor(private readonly jwt: JwtService) {}

  async use(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    next: NextFunction,
  ) {
    try {
      const { access_token } = req.cookies;

      if (!access_token) {
        throw new UnauthorizedException('No token provided');
      }

      const payload = await this.jwt.verify(access_token, {
        secret: jwtConstants.secret,
      });

      if (!payload) {
        throw new UnauthorizedException('Unauthorized');
      }

      req.body.user = payload;

      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid Token');
    }
  }
}
