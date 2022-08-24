import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { UserService } from '../user/user.service';
import { PostController } from './post.controller';
import { Post } from './entities/post.entity';
import { User } from '../user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  controllers: [PostController],
  providers: [PostService, UserService],
})
export class PostModule {}
