import { JwtAuthGuard } from '@Auth/guards';
import { User } from '@Common/decorators';
import { IUserPayload } from '@Common/types';
import { UserService } from '@User/services/user.service';
import {
  Controller,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')

export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Create a new user',
    description: 'Use it to create a new user in the database',
  })
  @Post('/me')
  async profile(@User() loggedUser: IUserPayload) {
    return loggedUser;
  }

  @UseInterceptors(FileInterceptor('avatar'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['avatar'],
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Patch()
  async updateAvatar(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return await this.userService.image(file);
  }
}
