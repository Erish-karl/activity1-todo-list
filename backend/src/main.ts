import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // frontend
  });

  const config = new DocumentBuilder()
    .setTitle('To-Do List API')
    .setDescription('API documentation for the Todo List backend')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(4000);
  console.log('✅ Backend running at http://localhost:4000');
  console.log('📘 Swagger Docs available at http://localhost:4000/api-docs');
}
bootstrap();
