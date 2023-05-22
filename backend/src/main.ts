/*
| Developed by Quartz Wallet
| Filename : main.ts
| Author : Alexandre Schaffner (alexandre.schaffner@icloud.com)
*/

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setting up Swagger
  //--------------------------------------------------------------------------
  const config = new DocumentBuilder()
    .setTitle('Quartz Wallet')
    .setDescription('The Quartz Wallet API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('doc', app, document);

  // Setting up middlewares
  //--------------------------------------------------------------------------
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  await app.listen(8000);
}
bootstrap();
