import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  recipeId: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;
}
