import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ReplyDto } from './dto/reply';
import { UpdateReplyDto } from './dto/update-reply.dto';

import { Reply } from './entities/reply.entity';
import { Post } from '../post/entities/post.entity';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply)
    private replyRespository: Repository<Reply>,

    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async create(createReplyDto: ReplyDto) {
    const post = await this.postRepository.findOneBy({
      id: createReplyDto.post_id,
    });

    createReplyDto.post = post;
    return await this.replyRespository.save(createReplyDto);

    // post.reply_id = reply.id;
    // post.reply = [reply];
    // console.log('>>>>>createReplyDto', post);
    // this.postRepository.save(post);

    // return await this.postRepository.save(post);
  }

  findAll() {
    return `This action returns all reply`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reply`;
  }

  update(id: number, updateReplyDto: UpdateReplyDto) {
    return `This action updates a #${id} reply`;
  }

  remove(id: number) {
    return `This action removes a #${id} reply`;
  }
}
