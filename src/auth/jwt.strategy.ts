import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { configService } from '../config/config.service';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getKeySecret(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: any, done: VerifiedCallback) {
    const userEntity = await this.authService.validate(payload);
    if (!userEntity) {
      return done(new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED), false);
    }

    return done(null, userEntity, payload.expiresIn);
  }
}
