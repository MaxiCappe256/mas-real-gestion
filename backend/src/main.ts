import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log('BOOTSTRAP START');

  const app = await NestFactory.create(AppModule);

  console.log('APP CREATED');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  const port = process.env.PORT ?? 3001;
  await app.listen(port);

  console.log('LISTENING ON PORT', port);
}
bootstrap();
