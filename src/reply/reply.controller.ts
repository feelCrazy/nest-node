import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyDto } from './dto/reply';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('reply')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createReplyDto: ReplyDto, @Req() req) {
    console.log('>>>req', req.user);
    const { userId } = req.user;

    return this.replyService.create(createReplyDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.replyService.remove(id);
  }
}
