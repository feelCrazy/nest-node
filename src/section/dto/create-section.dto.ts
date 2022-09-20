import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSectionDto {
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
