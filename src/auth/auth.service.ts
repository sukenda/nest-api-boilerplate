import { Injectable } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { UserEntity } from '../entity/user.entity';
import { sign } from 'jsonwebtoken';
import { Payload } from '../dto/payload';
import { configService } from '../config/config.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {
  }

  async generateToken(payload: Payload) {
    return sign(payload, configService.getKeySecret(), { expiresIn: '12h' });
  }

  async validate(param: Payload) {
    return await this.userService.findByUsername(param.username);
  }

}
