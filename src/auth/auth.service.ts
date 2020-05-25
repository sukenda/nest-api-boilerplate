import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { sign, verify } from 'jsonwebtoken';
import { Payload } from '../dto/payload';
import { configService } from '../config/config.service';
import { Token } from '../dto/token';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UserService) {
  }

  /**
   * https://valor-software.com/articles/json-web-token-authorization-with-access-and-refresh-tokens-in-angular-application-with-node-js-server.html
   * @param payload
   */
  async generateToken(payload: Payload): Promise<Token> {
    const accessToken = sign(payload, configService.getKeySecret(), { expiresIn: '15min' });

    const refreshToken = sign(payload, configService.getKeySecret(), { expiresIn: '30d' });
    await this.userService.updateRefreshToken(refreshToken, payload.id);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async refreshToken(refreshToken: string): Promise<UserEntity> {
    try {
      const tokenVerify = verify(refreshToken, configService.getKeySecret());
      /*@ts-ignore*/
      return await this.userService.findByUsername(tokenVerify.username);
    } catch (error) {
      throw new HttpException('Refresh Token Failed', HttpStatus.FORBIDDEN);
    }
  }

  async validate(param: Payload) {
    return await this.userService.findByUsername(param.username);
  }

}
