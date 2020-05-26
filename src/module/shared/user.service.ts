import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserEntity } from '../../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../../dto/user.dto';
import { Payload } from '../../dto/payload';

@Injectable()
export class UserService {

  private readonly logger = new Logger(UserService.name);

  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
  }

  async doLogin(username: string, password: string) {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (await user.validatePassword(password)) {
      return user;
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({ username: username });
  }

  async findByPayload(payload: Payload) {
    return await this.userRepository.findOne({ username: payload.username });
  }

  async updateRefreshToken(refreshToken: string, id: String) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    user.refreshToken = refreshToken; // Update refresh token

    return await this.userRepository.update(user.id, user);
  }

  async doRegister(param: UserDto) {
    const userDto = UserDto.from(param);
    const user = await this.userRepository.findOne({
      username: userDto.username,
    });

    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    return await this.userRepository.save(userDto.toEntity());
  }

}
