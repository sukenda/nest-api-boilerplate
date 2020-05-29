import { Injectable, CanActivate, ExecutionContext, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {

  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) { // Controller not set roles
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    this.logger.debug(roles.toString(), 'ACCESS GRANT ');
    this.logger.debug(user.roles.toString(), 'USER ACCESS ');

    const match: boolean = this.matchRoles(roles, user.roles);
    if (match) {
      return true;
    }

    this.logger.debug('User role not match');

    throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
  }

  public matchRoles(roles: string[], userRoles: string[]): boolean {
    return roles.some(role => userRoles.includes(role));
  }

}
