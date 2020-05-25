import { Body, Controller, Get, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../shared/user.service';
import { Payload } from '../dto/payload';
import { ResponseBuilder } from '../dto/response';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorator/role.decorator';
import { MenuService } from '../shared/menu.service';
import { RoleService } from '../shared/role.service';

@Controller('auth')
export class AuthController {

  constructor(
    private menuService: MenuService,
    private roleService: RoleService,
    private userService: UserService,
    private authService: AuthService) {
  }

  @Post('login')
  public async login(@Body() param: UserDto) {
    const user = await this.userService.doLogin(param.username, param.password);
    const payload: Payload = {
      roles: user.roles,
      username: user.username,
      profileName: user.profileName,
    };

    const token = await this.authService.generateToken(payload);
    return new ResponseBuilder()
      .setAccessToken(token)
      .setMessage('Login Success')
      .setStatusCode(HttpStatus.OK)
      .setData(UserDto.fromEntity(user))
      .build();
  }

  @Post('register')
  public async register(@Body() param: UserDto) {
    const user = await this.userService.doRegister(param);
    const payload: Payload = {
      roles: user.roles,
      username: user.username,
      profileName: user.profileName,
    };

    const token = await this.authService.generateToken(payload);
    return new ResponseBuilder()
      .setAccessToken(token)
      .setMessage('Login Success')
      .setStatusCode(HttpStatus.OK)
      .setData(UserDto.fromEntity(user))
      .build();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'TEACHER', 'STUDENT')
  @Get('menus')
  public async menus() {
    const menus = await this.menuService.doFind();
    return new ResponseBuilder()
      .setStatusCode(HttpStatus.OK)
      .setData(menus)
      .build();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
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
