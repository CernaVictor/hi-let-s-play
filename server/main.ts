import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiModuleList, AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //setup swagger
  const config = new DocumentBuilder()
    .setTitle('Hlp api')
    .setDescription('The hlp API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: apiModuleList,
    deepScanRoutes: true,
    operationIdFactory: (_controllerKey, methodKey) => methodKey,
  });

  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.use(cookieParser());

  await app.listen(3000);

  console.log(`Application is running on: http://localhost:3000/`);
  console.log(`API docs: http://localhost:3000/api-docs`);
}

bootstrap();
