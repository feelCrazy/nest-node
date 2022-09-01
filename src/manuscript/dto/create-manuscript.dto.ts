import { IsOptional, IsNotEmpty, IsString } from 'class-validator';
import { UserDTO } from '../../user/dto/user.dto';

export class CreateManuscriptDto {
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
  status: string;

  @IsOptional()
  remark: string;

  @IsOptional()
  time: string;

  @IsOptional()
  update_time: string;

  @IsOptional()
  user: UserDTO;
}
