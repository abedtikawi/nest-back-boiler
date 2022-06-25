import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { LoggerService } from './config/logger.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new LoggerService(),
  });

  const PORT = process.env.PORT || 3000;

  const logger = app.get(LoggerService);

  app.useLogger(logger);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);

  logger.log(`Application is running on: ${PORT}`);
}
bootstrap();
