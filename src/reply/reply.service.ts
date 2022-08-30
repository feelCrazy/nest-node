import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ReplyDto } from './dto/reply';

import { Reply } from './entities/reply.entity';
import { Post } from '../post/entities/post.entity';
import { User } from '../user/entity/user.entity';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply)
    private replyRespository: Repository<Reply>,

    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createReplyDto: ReplyDto, userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    console.log('>>>>>', user);

    const post = await this.postRepository.findOneBy({
      id: createReplyDto.post_id,
    });

    createReplyDto.post = post;
    createReplyDto.user = user;
    return await this.replyRespository.save(createReplyDto);
  }

  async remove(id: string) {
    const reply = await this.replyRespository.findOneBy({ id });
    return await this.replyRespository.remove(reply);
  }
}
