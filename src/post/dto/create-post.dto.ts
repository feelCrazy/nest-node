import { IsOptional, IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreatePostDto {
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsOptional()
  @IsNotEmpty()
  reply_id: string;

  @IsOptional()
  time: string;

  @IsOptional()
  update_time: string;
}
