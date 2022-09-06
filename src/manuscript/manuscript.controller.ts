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
  create(@Body() createManuscriptDto: CreateManuscriptDto, @Req() req) {
    const { id } = req.user;
    return this.manuscriptService.create(
      { ...createManuscriptDto, user_id: id },
      id,
    );
  }

  @Post('findAll')
  findAll(@Body() params: { title?: string; status?: string; id?: string }) {
    return this.manuscriptService.findAll(params);
  }

  @Post('update')
  update(
    @Body()
    updateManuscriptDto: {
      title?: string;
      status?: string;
      id?: string;
    },
  ) {
    console.log('>>>>updateManuscriptDto', updateManuscriptDto);
    const { id } = updateManuscriptDto;
    return this.manuscriptService.update(id, updateManuscriptDto);
  }

  @Get('remove')
  remove(@Req() req) {
    const { id } = req.query;
    return this.manuscriptService.remove(id);
  }
}
