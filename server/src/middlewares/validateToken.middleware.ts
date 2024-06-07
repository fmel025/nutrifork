import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthRequired implements NestMiddleware {
  constructor(private readonly jwt: JwtService) {}

  async use(req: any, res: any, next: (error?: Error | any) => void) {}
}
