import { Module } from '@nestjs/common';
import { RatingService } from './services';
import { RatingController } from './controllers';


@Module({
  controllers: [RatingController],
  providers: [RatingService],
})
export class RatingModule {}
