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

  async create(user: IUsers) {
    const use = await this.useRepository.findOneBy({ name: user.name });
    if (use) {
      return '';
    }
    return await this.useRepository.save(user);
  }

  async update(user: IUsers, id: string) {
    let use = await this.findOne(id);
    const { name, email, sex, phone, address, brithday } = user;
    use = { ...use, name, email, sex, phone, address, brithday };
    await this.useRepository.save(use);
  }

  async findUser(name: string): Promise<User> {
    return await this.useRepository.findOneBy({ name });
  }
}
