import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsDefined()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  fname: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  lname: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  password: string;
}
