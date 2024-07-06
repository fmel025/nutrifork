import { Injectable, NotFoundException } from '@nestjs/common';
import { UpsertRatingDto } from '../dto/create-rating.dto';
import { recipeRepository } from 'src/recipe/repositories';
import { ratingRepository } from '../repositories';
import { successResponse } from '@Common/utils/success-response';
@Injectable()
export class RatingService {
  // Use this service method to create or update a rating
  async upsert(upsertRatingDto: UpsertRatingDto, userId: string) {
    const { rating, recipeId } = upsertRatingDto;

    const recipe = await recipeRepository.findById(recipeId);

    if (!recipe) {
      throw new NotFoundException('The recipe ' + recipeId + ' does not exist');
    }

    const existingRating = await ratingRepository.findByRecipeAndUserIds({
      recipeId,
      userId,
    });

    const ratingPromise = existingRating
      ? ratingRepository.updateRating(existingRating.id, rating)
      : ratingRepository.createRating(rating, userId, recipeId);

    // TODO: Add connection here to the another API.
    const updatedRating = await ratingPromise;

    return successResponse(
      updatedRating,
      `Rating ${existingRating ? 'updated' : 'created'} successfully`,
      200,
    );
  }
}
