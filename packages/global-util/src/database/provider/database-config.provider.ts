import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export class TypeOrmConfigProvider {
  public static forRoot(): TypeOrmModuleOptions {
    return {
      type: 'mongodb',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: String(process.env.DATABASE_PASSWORD),
      database: process.env.DATABASE_NAME,
      logging: true,
      autoLoadEntities: true,
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
