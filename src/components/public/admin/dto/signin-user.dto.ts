import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class SignInAdminDto {
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
