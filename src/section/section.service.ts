import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSectionDto } from './dto/create-section.dto';
import { Section } from './entities/section.entity';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section)
    private SectionRepository: Repository<Section>,
  ) {}

  async create(createSectionDto: CreateSectionDto) {
    return await this.SectionRepository.save(createSectionDto);
  }

  async findAll() {
    return await this.SectionRepository.find();
  }

  async remove(id: string) {
    const section = await this.SectionRepository.findOneBy({ id });
    return await this.SectionRepository.remove(section);
  }
}
