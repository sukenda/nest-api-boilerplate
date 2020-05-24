import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './config/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (!configService.isProduction()) {
    const document = SwaggerModule.createDocument(app, new DocumentBuilder()
      .setTitle('NEST API')
      .setDescription('Nest boilerplate api')
      .build());

    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(3000);
}

bootstrap();
