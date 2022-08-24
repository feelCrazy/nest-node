import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { IUsers } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private useRepository: Repository<User>,
  ) {}

  finAll(): Promise<IUsers[]> {
    return this.useRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.useRepository.findOneBy({ id });
  }

  async removeOne(id: number): Promise<void> {
    await this.useRepository.delete(id);
  }

  async create(user: IUsers): Promise<IUsers> {
    return await this.useRepository.save(user);
  }

  async findUser(id: string) {
    return await this.useRepository.find({
      relations: {
        posts: true,
      },
      where: {
        id,
      },
    });
  }
}
