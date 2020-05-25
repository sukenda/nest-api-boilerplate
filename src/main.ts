import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './config/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingInterceptor } from './config/logging.interceptor';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as Express from 'express';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

const server = Express();
server.use(cors());
server.set('trust proxy', 1) // see https://expressjs.com/en/guide/behind-proxies.html
server.get('/', (req, res) => res.send('OK'));
server.get('/_ah/health', (req, res) => res.send('OK'));
server.get('/_ah/start', (req, res) => res.send('OK'));

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  app.useGlobalInterceptors(new LoggingInterceptor())
  app.use(helmet())
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    })
  )

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
