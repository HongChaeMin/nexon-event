import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { GlobalValidationPipe, TcpLoggingInterceptor } from '@repo/global-util';

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
  app.useGlobalInterceptors(new TcpLoggingInterceptor());
  await app.listen();
}
bootstrap();
