import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@Config/config.module';

@Module({
  imports: [AuthModule, UserModule, ConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
