import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateRecipeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  ingredients: string[];

  @ApiProperty({ type: [String] })
  @IsArray()
  instructions: string[];

  @ApiProperty()
  @IsArray()
  categories: string[];
}
