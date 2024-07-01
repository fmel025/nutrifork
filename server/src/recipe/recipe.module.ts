import { Module } from '@nestjs/common';
import { RecipeService } from './services';
import { RecipeController } from './controllers';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
