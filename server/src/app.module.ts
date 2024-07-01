import { Module } from '@nestjs/common';
import { AuthModule } from '@Auth/auth.module';
import { UserModule } from '@User/user.module';
import { ConfigModule } from '@Config/config.module';
import { UploadImageModule } from '@UploadImage/upload-image.module';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [AuthModule, UserModule, ConfigModule, UploadImageModule, RecipeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
