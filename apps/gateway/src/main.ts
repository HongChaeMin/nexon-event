import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpLoggingInterceptor } from '@repo/global-util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new HttpLoggingInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
