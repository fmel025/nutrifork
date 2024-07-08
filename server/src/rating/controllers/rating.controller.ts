import { Controller, Body, UseGuards, Patch } from '@nestjs/common';
import { RatingService } from '../services';
import { UpsertRatingDto } from '../dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserPayload } from '@Common/types';
import { User } from '@Common/decorators';
import { JwtAuthGuard } from '@Auth/guards';

@ApiTags('Rating')
@Controller('rating')
@ApiBearerAuth()
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @ApiOperation({
    summary: 'Add or update a rating to a recipe',
    description: 'Use it to access add or update a rating to a recipe',
  })
  @UseGuards(JwtAuthGuard)
  @Patch()
  upsert(@Body() createRatingDto: UpsertRatingDto, @User() user: UserPayload) {
    const { id } = user;
    return this.ratingService.upsert(createRatingDto, id);
  }
}
