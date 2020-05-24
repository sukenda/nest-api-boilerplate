import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { User } from '../model/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {
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
