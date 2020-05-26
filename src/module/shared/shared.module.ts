import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { HttpExceptionFilter } from '../../config/http-exception.filter';
import { LoggingInterceptor } from '../../config/logging.interceptor';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../entity/user.entity';
import { RoleEntity } from '../../entity/role.entity';
import { MenuEntity } from '../../entity/menu.entity';
import { RoleService } from './role.service';
import { MenuService } from './menu.service';
import { TasksService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity, MenuEntity])],
  providers: [
    RoleService, MenuService, UserService, TasksService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [UserService, RoleService, MenuService, TasksService],
})
export class SharedModule {}
