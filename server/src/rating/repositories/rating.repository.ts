import { prisma } from '@Common/database';
import { Rating } from '@prisma/client';
import { UpsertRatingSearchPayload } from '../interfaces';

export class RatingRepository {
  async createRating(
    rating: number,
    userId: string,
    recipeId: string,
  ): Promise<Rating> {
    return await prisma.rating.create({
      data: {
        rating,
        userId,
        recipeId,
      },
    });
  }

  async updateRating(id: string, rating: number) {
    return await prisma.rating.update({
      where: { id },
      data: { rating },
    });
  }

  async findByRecipeAndUserIds(payload: UpsertRatingSearchPayload) {
    return await prisma.rating.findFirst({
      where: {
        recipeId: payload.recipeId,
        userId: payload.userId,
      },
    });
  }
}

export const ratingRepository = new RatingRepository();
