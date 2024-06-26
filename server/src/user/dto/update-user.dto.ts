import { CreateUserDto } from '@Auth/dto';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  active?: string;
}
