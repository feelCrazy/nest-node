import {
  IsEmail,
  MaxLength,
  IsNotEmpty,
  IsString,
  IsDate,
  IsBoolean,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class UserDTO {
  readonly id: number;

  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsNumber()
  @IsOptional()
  age: number;

  @IsString()
  @IsOptional()
  address: string;

  @IsDate()
  @IsOptional()
  time: string;

  @IsDate()
  @IsOptional()
  update_time: string;

  @IsString()
  @IsOptional()
  sex: string;
}
