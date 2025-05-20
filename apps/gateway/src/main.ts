import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  GlobalRpcExceptionFilter,
  GlobalHttpExceptionFilter,
  GlobalValidationPipe,
  HttpLoggingInterceptor,
  CatchErrorInterceptor,
} from '@repo/global-util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new HttpLoggingInterceptor(), new CatchErrorInterceptor());
  app.useGlobalPipes(new GlobalValidationPipe());
  app.useGlobalFilters(
    new GlobalRpcExceptionFilter(),
    new GlobalHttpExceptionFilter()
  );
  await app.listen(3000);
}
bootstrap();
