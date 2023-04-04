import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [`${process.env.TRUSTED_SOURCE}`],
      credentials: true,
    },
  });

  const configService = app.get(ConfigService);
  const port = configService.get('API_PORT', { infer: true });

  app.use(cookieParser());
  await app.listen(port);
}
bootstrap();
