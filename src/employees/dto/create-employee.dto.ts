import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @Length(1, 100)
  firstName: string;

  @IsString()
  @Length(1, 100)
  lastNamePaternal: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  lastNameMaternal?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @IsEmail()
  @MaxLength(150)
  email: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  phoneNumber?: string;

  @IsString()
  @MaxLength(20)
  ci: string;

  @IsDateString()
  hireDate: string;

  @IsString()
  @MaxLength(100)
  position: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  baseSalary?: number;
}
