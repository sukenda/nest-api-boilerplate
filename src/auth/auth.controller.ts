import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../shared/user.service';
import { Payload } from '../dto/payload';
import { Response } from '../dto/response';
import { User } from '../model/user.entity';

@Controller('auth')
export class AuthController {

  constructor(
    private userService: UserService,
    private authService: AuthService) {
  }

  @Post('login')
  public async login(@Body() param: UserDto) {
    const user = await this.userService.doLogin(param.username, param.password);
    const payload: Payload = {
      username: user.username,
      profileName: user.profileName,
    };

    const token = await this.authService.generateToken(payload);
    return new Response(token, HttpStatus.OK, UserDto.fromEntity(user));
  }

  @Post('register')
  public async register(@Body() param: UserDto) {
    const user = await this.userService.doRegister(param);
    const payload: Payload = {
      username: user.username,
      profileName: user.profileName,
    };

    const token = await this.authService.generateToken(payload);
    return new Response(token, HttpStatus.OK, UserDto.fromEntity(user));
  }

}
