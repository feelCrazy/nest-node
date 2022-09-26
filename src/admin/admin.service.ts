import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async findOne({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const user = await this.adminRepository.findOneBy({ email: username });
    if (user && user.password === password) {
      return user;
    } else {
      return null;
    }
  }
}
