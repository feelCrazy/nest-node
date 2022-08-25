import { PartialType } from '@nestjs/mapped-types';
import { ReplyDto } from './reply';

export class UpdateReplyDto extends PartialType(ReplyDto) {}
