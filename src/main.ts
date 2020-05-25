import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './config/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingInterceptor } from './config/logging.interceptor';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as Express from 'express';
import * as cors from 'cors';

const server = Express();
server.use(cors());
server.get('/', (req, res) => res.send('OK'));
server.get('/_ah/health', (req, res) => res.send('OK'));
server.get('/_ah/start', (req, res) => res.send('OK'));

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.useGlobalInterceptors(new LoggingInterceptor())

  if (!configService.isProduction()) {
    const document = SwaggerModule.createDocument(app, new DocumentBuilder()
      .setTitle('NEST BOILERPLATE API')
      .setDescription('Nest boilerplate api')
      .setVersion('1.0')
      .build());

    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(3000);
}

bootstrap();
