import { Injectable, CanActivate, ExecutionContext, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) { // Controller not set roles
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    Logger.debug(roles.toString(), 'ACCESS GRANT ');
    Logger.debug(user.roles.toString(), 'USER ACCESS ');

    const match: boolean = this.matchRoles(roles, user.roles);
    if (match) {
      return true;
    }

    Logger.debug('User role not match');

    throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);

  }

  public matchRoles(roles: string[], userRoles: string[]): boolean {
    let value = userRoles.filter((role) => roles.includes(role));
    return value.length != 0;
  }

}
