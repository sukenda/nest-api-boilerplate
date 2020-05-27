import { Body, Controller, Get, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../../dto/user.dto';
import { UserService } from '../shared/user.service';
import { Payload } from '../../dto/payload';
import { ResponseBuilder } from '../../dto/response';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorator/role.decorator';
import { MenuService } from '../shared/menu.service';
import { RoleService } from '../shared/role.service';
import { AuthCustomGuard } from '../../guards/auth.custom.guard';

@Controller()
export class AuthController {

  constructor(
    private menuService: MenuService,
    private roleService: RoleService,
    private userService: UserService,
    private authService: AuthService) {
  }

  @Post('auth/login')
  public async login(@Body() param: UserDto) {
    const user = await this.userService.doLogin(param.username, param.password);
    const payload: Payload = {
      id: user.id,
      roles: user.roles,
      username: user.username,
    };

    const token = await this.authService.generateToken(payload);
    return new ResponseBuilder()
      .setAccessToken(token.accessToken)
      .setRefreshToken(token.refreshToken)
      .setMessage('Login Success')
      .setStatusCode(HttpStatus.OK)
      .setData(UserDto.fromEntity(user))
      .build();
  }

  @Get('auth/refresh-token')
  public async refreshToken(@Query('refreshToken') refreshToken: string) {
    const user = await this.authService.refreshToken(refreshToken);
    const payload: Payload = {
      id: user.id,
      roles: user.roles,
      username: user.username,
    };

    const token = await this.authService.generateToken(payload);
    return new ResponseBuilder()
      .setAccessToken(token.accessToken)
      .setRefreshToken(token.refreshToken)
      .setMessage('Refresh Token Success')
      .setStatusCode(HttpStatus.OK)
      .setData(UserDto.fromEntity(user))
      .build();
  }

  @Post('auth/register')
  public async register(@Body() param: UserDto) {
    const user = await this.userService.doRegister(param);
    const payload: Payload = {
      id: user.id,
      roles: user.roles,
      username: user.username,
    };

    const token = await this.authService.generateToken(payload);
    return new ResponseBuilder()
      .setAccessToken(token.accessToken)
      .setRefreshToken(token.refreshToken)
      .setMessage('Register Success')
      .setStatusCode(HttpStatus.OK)
      .setData(UserDto.fromEntity(user))
      .build();
  }

  @UseGuards(AuthCustomGuard, RolesGuard)
  @Roles('ADMIN', 'TEACHER', 'STUDENT')
  @Get('menus')
  public async menus() {
    const menus = await this.menuService.doFind();
    return new ResponseBuilder()
      .setStatusCode(HttpStatus.OK)
      .setData(menus)
      .build();
  }

  @UseGuards(AuthCustomGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('roles')
  public async roles() {
    const roles = await this.roleService.doFind();
    return new ResponseBuilder()
      .setStatusCode(HttpStatus.OK)
      .setData(roles)
      .build();
  }

}
