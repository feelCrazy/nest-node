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
  readonly id: string;

  @IsNotEmpty()
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsDate()
  brithday: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsBoolean()
  @IsOptional()
  isAdmin: boolean;

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
