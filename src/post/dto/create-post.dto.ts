import { IsOptional, IsNotEmpty, IsString } from 'class-validator';
import { UserDTO } from '../../user/dto/user.dto';
import { ReplyDto } from '../../reply/dto/reply';
export class CreatePostDto {
  id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  user_id: string;

  @IsOptional()
  @IsNotEmpty()
  reply_id: string;

  @IsOptional()
  time: string;

  @IsOptional()
  update_time: string;

  @IsOptional()
  user: UserDTO;
}
