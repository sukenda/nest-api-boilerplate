import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorator/role.decorator';
import { User } from '../decorator/user.decorator';
import { AuthCustomGuard } from '../guards/auth.custom.guard';
import { UserEntity } from '../entity/user.entity';

@Controller('students')
export class StudentController {

  @Get()
  @UseGuards(AuthCustomGuard, RolesGuard)
  @Roles('ADMIN', 'TEACHER', 'STUDENT')
  find(@User() userEntity: UserEntity): string {
    console.log('LOG USER', userEntity);
    return 'This action returns all students';
  }

}
