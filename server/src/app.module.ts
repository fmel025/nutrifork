import { Module } from '@nestjs/common';
import { AuthModule } from '@Auth/auth.module';
import { UserModule } from '@User/user.module';
import { ConfigModule } from '@Config/config.module';
import { UploadImageModule } from '@UploadImage/upload-image.module';

@Module({
  imports: [AuthModule, UserModule, ConfigModule, UploadImageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
