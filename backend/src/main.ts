import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ErrorFilter } from './_shared/filters/error/error.filter';
import helmet from 'helmet';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet())

  app.enableCors({
    origin: 'http://localhost:4200',
  });

  app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.useGlobalFilters(new ErrorFilter());

  const config = new DocumentBuilder()
    .setTitle('NestJS Boilerplate')
    .setDescription('API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  SwaggerModule.setup('docs', app, () => SwaggerModule.createDocument(app, config));

  const port = process.env.PORT ?? 3000;
  console.log(`Server running on http://localhost:${port}`);
  await app.listen(port);
}
bootstrap();
