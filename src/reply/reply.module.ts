import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReplyService } from './reply.service';
import { PostService } from '../post/post.service';
import { ReplyController } from './reply.controller';
import { UserService } from '../user/user.service';
import { Post } from '../post/entities/post.entity';
import { Reply } from './entities/reply.entity';
import { User } from '../user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Reply, User])],
  controllers: [ReplyController],
  providers: [ReplyService, PostService, UserService],
})
export class ReplyModule {}
