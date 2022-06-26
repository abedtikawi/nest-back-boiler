import {
  IsBooleanString,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateAdminDto {
  @IsOptional()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @MinLength(3)
  fname: string;
  @IsOptional()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @MinLength(3)
  lname: string;
  @IsOptional()
  @IsNotEmpty()
  @IsDefined()
  @IsString()
  @MinLength(3)
  password: string;
  @IsOptional()
  @IsNotEmpty()
  @IsDefined()
  @IsPhoneNumber()
  phoneNumber: string;
  @IsOptional()
  @IsNotEmpty()
  @IsBooleanString()
  isAvailable: boolean;
}
