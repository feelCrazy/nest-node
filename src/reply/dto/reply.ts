import { IsOptional, IsNotEmpty } from 'class-validator';
import { CreatePostDto } from '../../post/dto/create-post.dto';

export class ReplyDto {
  readonly id: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  post_id: string;

  @IsOptional()
  time: string;

  @IsOptional()
  post: CreatePostDto;
}
