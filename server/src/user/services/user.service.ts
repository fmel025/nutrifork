import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto';
import { userRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UploadImageService } from '@UploadImage/services';
import { UserPayload } from '@Common/types';
import { UpdateUserDto } from '@User/dto';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly uploadImageService: UploadImageService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, username } = createUserDto;

    await this.validateEmail(email);
    await this.validateUsername(username);

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    createUserDto.password = hashedPassword;

    const newUser = await userRepository.create(createUserDto);

    const payload = { id: newUser.id, email: newUser.email };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async update(loggedUser: UserPayload, data: UpdateUserDto) {
    const { email, password, username } = data;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      data.password = hashedPassword;
    }

    if (email) {
      await this.validateEmail(email);
    }

    if (username) {
      await this.validateUsername(username);
    }

    const updatedUser = await userRepository.update(loggedUser.id, data);

    delete updatedUser.password;
    delete updatedUser.avatarPublicId;

    return {
      statusCode: HttpStatus.OK,
      data: updatedUser,
      message: 'User updated successfully',
    };
  }

  async updateAvatar(file: Express.Multer.File, user: UserPayload) {
    if (!file.mimetype.startsWith('image/') || file.mimetype === 'image/gif') {
      throw new BadRequestException(
        'Invalid file type. Only non-GIF images are allowed.',
      );
    }

    const loggedUser = await this.findOneById(user.id);

    if (!loggedUser) {
      throw new ConflictException('User not found');
    }

    const deleteOldAvatar =
      loggedUser.avatar && loggedUser.avatarPublicId
        ? this.uploadImageService.deleteFile(loggedUser.avatarPublicId)
        : Promise.resolve();

    const uploadNewAvatar = this.uploadImageService.uploadFile(file, 'avatar');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, cloudinaryResponse] = await Promise.all([
      deleteOldAvatar,
      uploadNewAvatar,
    ]);

    const { public_id, secure_url } = cloudinaryResponse;

    await userRepository.update(loggedUser.id, {
      avatar: secure_url,
      avatarPublicId: public_id,
    });

    return {
      avatar: secure_url,
      avatarPublicId: public_id,
    };
  }

  async validateEmail(email: string): Promise<void> {
    const existingUser = await userRepository.findOneByEmail(email);

    if (existingUser) {
      throw new ConflictException(`The email ${email} is already registered`);
    }
  }

  async validateUsername(username: string): Promise<void> {
    const existingUser = await userRepository.findOneByUsername(username);

    if (existingUser) {
      throw new ConflictException(
        `The username ${username} is already registered`,
      );
    }
  }

  async getProfileInfo(loggedUser: UserPayload) {
    const user = await userRepository.findOneById(loggedUser.id);

    delete user.password;
    delete user.avatarPublicId;

    return {
      statusCode: HttpStatus.OK,
      data: user,
      message: 'User found successfully',
    };
  }

  async findOneByEmail(email: string) {
    return await userRepository.findOneByEmail(email);
  }

  async findOneById(id: string) {
    return await userRepository.findOneById(id);
  }
}
