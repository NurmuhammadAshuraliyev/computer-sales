import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { AllExceptionsFilter } from './common/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

    app.useGlobalFilters(new AllExceptionsFilter());

    app.use(cookieParser());

    app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      allowedHeaders: 'Content-Type, Authorization, Cookie',
      exposedHeaders: 'Set-Cookie',
    });

    // 🔹 Swagger konfiguratsiya
    const config = new DocumentBuilder()
      .setTitle('API Docs')
      .setDescription('Loyiha uchun Swagger hujjatlari')
      .setVersion('1.0')
      .addBearerAuth() // agar JWT ishlatsangiz
      .addCookieAuth('connect.sid') // agar cookie auth ishlatsangiz
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: { persistAuthorization: true },
    });

    await app.listen(process.env.PORT ?? 3000);
    logger.log(`Application is running on: ${await app.getUrl()}`);
    logger.log(`Swagger docs: ${await app.getUrl()}/api/docs`);
  } catch (error) {
    logger.error(error);
  }
}
bootstrap();
