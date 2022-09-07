import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ManuscriptService } from './manuscript.service';
import { CreateManuscriptDto } from './dto/create-manuscript.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('manuscript')
export class ManuscriptController {
  constructor(private readonly manuscriptService: ManuscriptService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() createManuscriptDto: CreateManuscriptDto, @Req() req) {
    const { id } = req.user;
    return await this.manuscriptService.create(
      { ...createManuscriptDto, user_id: id },
      id,
    );
  }

  @Post('findAll')
  async findAll(
    @Body()
    params: {
      title?: string;
      status?: string;
      id?: string;
      name?: string;
    },
  ) {
    return await this.manuscriptService.findAll(params);
  }

  @Post('update')
  async update(
    @Body()
    updateManuscriptDto: {
      title?: string;
      status?: string;
      id?: string;
    },
  ) {
    const { id } = updateManuscriptDto;
    return await this.manuscriptService.update(id, updateManuscriptDto);
  }

  @Get('remove')
  async remove(@Req() req) {
    const { id } = req.query;
    return await this.manuscriptService.remove(id);
  }
  @Get('getDetial')
  async getDetial(@Req() req) {
    const { id } = req.query;
    return await this.manuscriptService.getDetial(id);
  }
}
