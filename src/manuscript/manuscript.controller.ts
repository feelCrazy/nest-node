import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
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
  @UseGuards(JwtAuthGuard)
  @Post('findAll')
  async findAll(
    @Body()
    params: {
      title?: string;
      status?: string;
      id?: string;
      name?: string;
      page: {
        pageNum?: number;
        pageSize?: number;
      };
      isAudit?: boolean;
    },
    @Req() req,
  ) {
    const { id } = req.user;
    const { page, isAudit, ...res } = params;
    const data = { ...res };
    if (!isAudit) {
      data['user_id'] = id;
    }
    return await this.manuscriptService.findAll(data, page);
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

  @UseGuards(JwtAuthGuard)
  @Post('auditUpdate')
  async audit(
    @Body()
    updateManuscriptDto: {
      id: string;
      status: string;
      remark: string;
    },
    @Req() req,
  ) {
    const { id } = req.user;
    return await this.manuscriptService.audit(
      updateManuscriptDto.id,
      updateManuscriptDto,
      id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('findMyAuditList')
  async findMyAuditList(
    @Body()
    params: {
      title?: string;
      status?: string;
      id?: string;
      name?: string;
      page: {
        pageNum?: number;
        pageSize?: number;
      };
    },
    @Req() req,
  ) {
    const { id } = req.user;
    const { page, ...res } = params;

    return await this.manuscriptService.findAll(
      { ...res, reviewer_id: id },
      page,
    );
  }
}
