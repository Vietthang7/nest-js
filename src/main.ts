import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Thiết lập validation pipe toàn cục
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  })); 
  
  app.enableCors({
    origin: ['http://localhost:3000', 'https://yourdomain.com'], // Cho phép các domain này
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Cho phép gửi cookies
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
