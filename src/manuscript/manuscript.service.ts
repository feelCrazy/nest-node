import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateManuscriptDto } from './dto/create-manuscript.dto';
import { UpdateManuscriptDto } from './dto/update-manuscript.dto';
import { Manuscript } from './entities/manuscript.entity';
import { User } from '../user/entity/user.entity';
@Injectable()
export class ManuscriptService {
  constructor(
    @InjectRepository(Manuscript)
    private manuscriptRepository: Repository<Manuscript>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(parmas: { title?: string; status?: string; id?: string }) {
    return await this.manuscriptRepository.find({
      where: {
        ...parmas,
        isDelete: false,
      },
    });
  }

  async create(createManuscriptDto: CreateManuscriptDto, id: string) {
    const user = await this.userRepository.findOne({
      select: ['name', 'email', 'id', 'isActive', 'sex'],
      where: { id },
    });
    createManuscriptDto.user = user;
    return await this.manuscriptRepository.save(createManuscriptDto);
  }

  async update(id: string, updateManuscriptDto: UpdateManuscriptDto) {
    const manuscript = await this.manuscriptRepository.findOneBy({ id });
    manuscript.status = updateManuscriptDto.status;
    manuscript.remark = updateManuscriptDto.remark;
    return await this.manuscriptRepository.save(manuscript);
  }

  async remove(id: string) {
    const manuscript = await this.manuscriptRepository.findOneBy({ id });
    manuscript.isDelete = true;
    return await this.manuscriptRepository.save(manuscript);
  }

  async getDetial(id: string) {
    return this.manuscriptRepository.findOneBy({ id });
  }
}
