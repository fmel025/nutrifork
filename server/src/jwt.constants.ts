import { ConfigService } from '@nestjs/config';

export const jwtConstants = {
  secret:
    new ConfigService().get<string>('JWT_SECRET') ||
    "i~Skm1<o'rF?(<0;flSr5Exl1.R,Wg|Mw2OV}6DNo8L9c}:&6C",
};
