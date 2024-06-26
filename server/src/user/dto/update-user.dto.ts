import { CreateUserDto } from '@Auth/dto';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsBoolean()
  active?: string;
}
