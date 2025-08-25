import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import compression from 'compression';

async function bootstrap() {
  const logger = new Logger();

  try {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('/api');

    app.use(compression());

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );

    app.use(cookieParser());

    app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      allowedHeaders: 'Content-Type, Authorization, Cookie',
      exposedHeaders: 'Set-Cookie',
    });

    await app.listen(process.env.PORT ?? 3000);
  } catch (error) {
    logger.error(error);
  }
}
bootstrap();
