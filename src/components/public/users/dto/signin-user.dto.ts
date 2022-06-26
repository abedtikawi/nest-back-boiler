import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsDefined()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @MinLength(3)
  password: string;
}
