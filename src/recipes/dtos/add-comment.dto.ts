import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddCommentDto {
  @ApiProperty({
    description: 'Recipe ID',
    example: '665bbb952e37f243604a59ba',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(24)
  recipeId: string;

  @ApiProperty({
    description: 'Author name',
    example: 'user',
  })
  @IsString()
  @IsNotEmpty()
  authorName: string;

  @ApiProperty({
    description: 'Author ID',
    example: '665bbb952e37f243604a59ba',
  })
  @IsString()
  @IsNotEmpty()
  authorId: string;

  @ApiProperty({
    description: 'Comment body',
    example: 'I like this recipe',
  })
  @IsString()
  @IsNotEmpty()
  commentBody: string;
}
