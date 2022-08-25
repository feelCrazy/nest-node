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

  async finAll(): Promise<IUsers[]> {
    return await this.useRepository.find();
  }

  async findActive(): Promise<IUsers[]> {
    return await this.useRepository.find({
      relations: {
        posts: true,
      },
      where: { isActive: true },
    });
  }

  async findOne(id: string): Promise<User> {
    return await this.useRepository.findOneBy({ id });
  }

  async removeOne(id: string): Promise<User> {
    const user = await this.useRepository.findOneBy({ id });
    user.isActive = false;
    return await this.useRepository.save(user);
  }

  async create(user: IUsers): Promise<IUsers> {
    return await this.useRepository.save(user);
  }
}
