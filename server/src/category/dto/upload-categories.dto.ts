import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class UploadCategories {
  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  categories: string[];
}

export class UploadAllergies {
  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  allergies: string[];
}
