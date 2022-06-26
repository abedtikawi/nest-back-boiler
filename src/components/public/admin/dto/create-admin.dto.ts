import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsDefined()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsDefined()
  @IsPhoneNumber()
  phoneNumber: string;
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @MinLength(3)
  password: string;
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @MinLength(3)
  fname: string;
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @MinLength(3)
  lname: string;
}
