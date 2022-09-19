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

  @IsOptional()
  user_id: string;

  @IsOptional()
  status: string;

  @IsOptional()
  isDelete: boolean;

  @IsOptional()
  remark: string;

  @IsOptional()
  time: string;

  @IsOptional()
  update_time: string;

  @IsOptional()
  user: {
    name: string;
    email: string;
    id: string;
    isActive: boolean;
    sex: string;
  };
}
