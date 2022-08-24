import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
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

  findAll() {
    return `This action returns all post`;
  }

  async findOne(id: string) {
    return await this.postRepository.find({
      relations: {
        user: true,
      },
      where: {
        id,
      },
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

  async createPost(params: CreatePostDto): Promise<CreatePostDto> {
    // 建立表关系
    params.user = await this.userRepository.findOneBy({ id: params.user_id });
    return await this.postRepository.save(params);
  }
}
