import { Expose, Transform } from 'class-transformer';
import { Recipe, Rating } from '@prisma/client';

export class RecipeResponseDoc {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  image: string;

  @Expose()
  instructions: string[];

  @Expose()
  ingredients: string[];

  @Expose()
  categories: string[];

  @Expose()
  @Transform(({ obj }: { obj: Recipe & { userId?: string } }) => {
    return obj.userId ? obj.userIDs.includes(obj.userId) : false;
  })
  favoriteByUser: boolean;

  @Expose()
  @Transform(({ obj }: { obj: Recipe & { rating?: Rating } }) => {
    return obj.rating ? obj.rating.rating : 0;
  })
  ratingByUser: number;
}
