import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto';
import { userRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(private readonly jwtService: JwtService) {}

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
}
