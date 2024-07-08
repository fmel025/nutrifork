import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UploadImageModule } from '@UploadImage/upload-image.module';
import { RecipeModule } from 'src/recipe/recipe.module';

@Module({
  imports: [UploadImageModule, RecipeModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
