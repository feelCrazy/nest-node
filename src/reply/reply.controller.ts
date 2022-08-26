import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyDto } from './dto/reply';

@Controller('reply')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Post('create')
  create(@Body() createReplyDto: ReplyDto) {
    return this.replyService.create(createReplyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.replyService.remove(id);
  }
}
