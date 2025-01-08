import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/modules/app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import { error } from 'console';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const response = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: {},
          error: HttpStatus[HttpStatus.BAD_REQUEST],
        };
        errors.forEach((error: ValidationError) => {
          const field = error.property;
          const errorsList = Object.values(error.constraints);
          response.message[field] = errorsList;
        });

        return response;
      },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Agriculture Transaction API')
    .setDescription(
      'API to record all the movements in companies dedicated to agriculture',
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
  app.enableCors({ origin: 'http://localhost:8080/' });

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
