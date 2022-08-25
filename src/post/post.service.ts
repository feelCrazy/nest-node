import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { User } from '../user/entity/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(id: string) {
    return await this.postRepository.find({
      relations: {
        reply: true,
      },
      where: {
        id,
      },
    });
  }

  async update(id: string, updatePostDto: CreatePostDto) {
    const post = await this.postRepository.findOneBy({ id });
    post.content = updatePostDto.content;
    return await this.postRepository.save(post);
  }

  async remove(id: string) {
    const post = await this.postRepository.findOneBy({ id });
    return await this.postRepository.remove(post);
  }

  async createPost(params: CreatePostDto): Promise<CreatePostDto> {
    // 建立表关系
    params.user = await this.userRepository.findOneBy({ id: params.user_id });
    return await this.postRepository.save(params);
  }
}
