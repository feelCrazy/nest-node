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

  async findActive(
    parmas: {
      name?: string;
      isAdmin?: boolean;
    },
    page: {
      pageNum?: number;
      pageSize?: number;
    },
  ) {
    const limit = page.pageNum - 1 || 0;
    const take = page.pageSize || 10;
    const skip = limit * take;
    const [data, count] = await this.useRepository.findAndCount({
      relations: {
        posts: true,
      },
      where: { isActive: true, name: parmas.name, isAdmin: parmas.isAdmin },
      order: {
        time: 'DESC',
      },
      skip,
      take,
    });
    return {
      data,
      count,
    };
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
    const use = await this.useRepository.findOneBy({ email: user.email });
    if (use) {
      return null;
    }
    return await this.useRepository.save(user);
  }

  async update(user: IUsers, id: string) {
    let use = await this.findOne(id);
    const { name, email, sex, phone, address, brithday, isActive } = user;
    use = { ...use, name, email, sex, phone, address, brithday, isActive };
    await this.useRepository.save(use);
  }

  async findUser(email: string): Promise<User> {
    return await this.useRepository.findOneBy({ email });
  }

  async updatePassword(
    id: string,
    param: { oldPassword: string; newPassword: string },
  ) {
    const user = await this.useRepository.findOneBy({ id });
    if (param.oldPassword === user.password) {
      user.password = param.newPassword;
      await this.useRepository.save(user);
      return '修改成功';
    } else {
      return null;
    }
  }
}
