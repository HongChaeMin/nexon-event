import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from '@repo/global-util/logging';
import { AppModule } from './app.module';
import { GlobalValidationPipe } from './errors/pipes/global-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: { host: 'localhost', port: 3001 },
    },
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalPipes(new GlobalValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen();
}
bootstrap();
