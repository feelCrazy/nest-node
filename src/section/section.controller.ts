import { Controller, Get, Post, Body } from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';

@Controller('section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post('createSection')
  async create(@Body() createSectionDto: CreateSectionDto) {
    return await this.sectionService.create(createSectionDto);
  }

  @Get('findAllSection')
  async findAll() {
    return await this.sectionService.findAll();
  }

  @Get('removeSection')
  remove(@Body('id') id: string) {
    return this.sectionService.remove(id);
  }
}
