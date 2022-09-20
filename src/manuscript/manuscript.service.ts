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

  async findAll(
    parmas: {
      title?: string;
      status?: string;
      id?: string;
      name?: string;
      reviewer_id?: string;
    },
    page: {
      pageNum?: number;
      pageSize?: number;
    },
  ) {
    const { name, ...result } = parmas;
    const skip = page.pageNum - 1 || 0;
    const take = page.pageSize || 10;
    const [data, count] = await this.manuscriptRepository.findAndCount({
      relations: {
        user: true,
      },
      where: {
        ...result,
        isDelete: false,
        user: {
          name: name,
        },
      },
      skip,
      take,
    });
    return {
      data,
      count,
    };
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
    manuscript.status = updateManuscriptDto.status || manuscript.status;
    manuscript.remark = updateManuscriptDto.remark || manuscript.remark;
    manuscript.content = updateManuscriptDto.content || manuscript.content;
    manuscript.title = updateManuscriptDto.title || manuscript.title;
    return await this.manuscriptRepository.save(manuscript);
  }

  async remove(id: string) {
    const manuscript = await this.manuscriptRepository.findOneBy({ id });
    manuscript.isDelete = true;
    return await this.manuscriptRepository.save(manuscript);
  }

  // 审核
  async audit(
    id: string,
    updateManuscriptDto: UpdateManuscriptDto,
    audit_id: string,
  ) {
    const manuscript = await this.manuscriptRepository.findOneBy({ id });
    manuscript.status = updateManuscriptDto.status;
    manuscript.remark = updateManuscriptDto.remark;
    manuscript.reviewer_id = audit_id;
    return await this.manuscriptRepository.save(manuscript);
  }

  async getDetial(id: string) {
    return this.manuscriptRepository.findOneBy({ id });
  }
}
