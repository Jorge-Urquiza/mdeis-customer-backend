import { IsOptional, IsString, Length, MaxLength } from 'class-validator';

export class CreateMeasurementUnitDto {
  @IsString()
  @Length(1, 20)
  code: string;

  @IsString()
  @Length(1, 100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;
}
