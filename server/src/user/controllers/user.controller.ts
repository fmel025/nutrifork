import { JwtAuthGuard } from '@Auth/guards';
import { User } from '@Common/decorators';
import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Use it to create a new user in the database',
  })
  @UseGuards(JwtAuthGuard)
  @Post('/me')
  async profile(@User() user) {
    console.log(user);
    return {};
  }
}
