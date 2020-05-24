import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { configService } from '../config/config.service';
import { PassportStrategy } from '@nestjs/passport';
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
    const user = await this.authService.validate(payload);
    if (!user) {
      return done(
        new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED),
        false,
      );
    }

    return done(null, user, payload.iat);
  }

  /*async validate(payload: any) {
    return { id: payload.id, username: payload.username };
  }*/
}
