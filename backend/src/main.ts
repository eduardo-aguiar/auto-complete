import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3001', 'http://frontend:3000'],
  });
  await app.listen(3000);
  Logger.log(`Server running on http://localhost:3000`, 'Bootstrap');
}
bootstrap();
