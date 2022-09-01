import { Injectable } from '@nestjs/common';
import { CreateManuscriptDto } from './dto/create-manuscript.dto';
import { UpdateManuscriptDto } from './dto/update-manuscript.dto';

@Injectable()
export class ManuscriptService {
  create(createManuscriptDto: CreateManuscriptDto) {
    return 'This action adds a new manuscript';
  }

  findAll() {
    return `This action returns all manuscript`;
  }

  findOne(id: number) {
    return `This action returns a #${id} manuscript`;
  }

  update(id: number, updateManuscriptDto: UpdateManuscriptDto) {
    return `This action updates a #${id} manuscript`;
  }

  remove(id: number) {
    return `This action removes a #${id} manuscript`;
  }
}
