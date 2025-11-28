import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(1, 150)
  name: string;

  @IsString()
  @Length(1, 50)
  sku: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;

  @IsInt()
  @Min(0)
  stock: number;

  @IsInt()
  @IsPositive()
  measurementUnitId: number;
}
