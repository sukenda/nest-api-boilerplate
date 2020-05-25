import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    AppService],
})
export class AppModule {
}
