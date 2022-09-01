import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManuscriptService } from './manuscript.service';
import { CreateManuscriptDto } from './dto/create-manuscript.dto';
import { UpdateManuscriptDto } from './dto/update-manuscript.dto';

@Controller('manuscript')
export class ManuscriptController {
  constructor(private readonly manuscriptService: ManuscriptService) {}

  @Post()
  create(@Body() createManuscriptDto: CreateManuscriptDto) {
    return this.manuscriptService.create(createManuscriptDto);
  }

  @Get()
  findAll() {
    return this.manuscriptService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manuscriptService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManuscriptDto: UpdateManuscriptDto) {
    return this.manuscriptService.update(+id, updateManuscriptDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manuscriptService.remove(+id);
  }
}
