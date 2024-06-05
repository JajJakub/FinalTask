import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IngredientListDto } from './ingredient-list.dto';
import { CuisineType } from '../../enums/cuisine-type.enum';

export class CreateRecipeDto {
  @ApiProperty({
    description: 'Author ID',
    example: '665bbb952e37f243604a59ba',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(24)
  authorId: string;

  @ApiProperty({
    description: 'Dish name',
    example: 'Chicken Curry',
  })
  @IsString()
  @MaxLength(128)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Cuisine type',
    example: 'italian',
  })
  @IsEnum(CuisineType)
  @IsNotEmpty()
  cuisine: CuisineType;

  @ApiProperty({
    description: 'Ingredients list',
    example: [
      { product: 'apple', quantity: 3, measureType: 'piece' },
      { product: 'milk', quantity: 250.5, measureType: 'milliliters' },
    ],
  })
  @IsArray()
  @IsNotEmpty()
  ingredients: IngredientListDto[];

  @ApiProperty({
    description: 'How to prepare dish (steps)',
    example: ['Step 1', 'Step 2', 'Step 3'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  steps: string[];

  @ApiProperty({
    description: 'Url to dish images',
    example: ['Url 1', 'Url 2', 'Url 3'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  photos: string[];
}
