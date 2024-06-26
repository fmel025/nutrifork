import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto';
import { userRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UploadImageService } from '@UploadImage/services';
import { UserPayload } from '@Common/types';

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

  async updateAvatar(file: Express.Multer.File, user: UserPayload) {
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

  async findOneByEmail(email: string) {
    return await userRepository.findOneByEmail(email);
  }

  async findOneById(id: string) {
    return await userRepository.findOneById(id);
  }
}
