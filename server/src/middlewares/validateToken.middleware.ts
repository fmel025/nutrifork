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

  async use(@Req() req: Request, @Res() res: Response, next: NextFunction) {
    try {
      const { access_token } = req.cookies;
      if (!access_token) {
        return res.status(401).json({ message: 'No token provided' });
      }

      const payload = await this.jwt.verifyAsync(access_token, {
        secret: jwtConstants.secret,
      });

      if (!payload) {
        return res.status(401).json({
          message: 'Unauthorized',
        });
      }

      req.body.user = payload;

      next();
    } catch (err) {
      console.log('error', err);
      throw new UnauthorizedException('Invalid Token');
    }
  }
}
