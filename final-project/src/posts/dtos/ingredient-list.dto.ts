import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IngredientListDto {
  @ApiProperty({
    description: 'Product name',
    example: 'apple',
  })
  @IsString()
  @IsNotEmpty()
  product: string;

  @ApiProperty({
    description: 'Product quantity',
    example: 3,
  })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    description: 'Measurement unit',
    example: 'piece',
  })
  @IsString()
  @IsNotEmpty()
  measureType: string;
}
