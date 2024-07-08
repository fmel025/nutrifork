import { Module } from '@nestjs/common';
import { AuthModule } from '@Auth/auth.module';
import { UserModule } from '@User/user.module';
import { ConfigModule } from '@Config/config.module';
import { UploadImageModule } from '@UploadImage/upload-image.module';
import { RecipeModule } from './recipe/recipe.module';
import { RatingModule } from './rating/rating.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule,
    UploadImageModule,
    RecipeModule,
    RatingModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
