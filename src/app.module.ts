import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LoggerMiddleware } from './logger.middleware';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { ReplyModule } from './reply/reply.module';
import { AuthModule } from './auth/auth.module';
const SQL_CONFIG = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'nest',
  entities: [],
  synchronize: true,
  autoLoadEntities: true,
});

@Module({
  imports: [SQL_CONFIG, UserModule, PostModule, ReplyModule, AuthModule],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cat');
  }
}
