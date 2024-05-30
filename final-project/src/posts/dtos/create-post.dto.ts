import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Ingredient } from '../../schemas/ingredient.schema';

export class CreatePostDto {
  @ApiProperty({
    description: 'Dish name',
    example: 'Chicken Curry',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Ingredients list',
  })
  @IsArray()
  @IsNotEmpty()
  ingredients: Ingredient[];

  @ApiProperty({
    description: 'How to prepare this dish (steps)',
  })
  @IsArray()
  @IsNotEmpty()
  steps: string[];

  @ApiProperty({
    description: 'Url to dish images',
  })
  @IsArray()
  @IsNotEmpty()
  photos: string[];
}
