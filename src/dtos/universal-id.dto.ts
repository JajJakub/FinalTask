import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UniversalIdDto {
  @ApiProperty({
    description: 'MongoDB _id',
    example: '665bbb952e37f243604a59ba',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(24)
  id: string;
}
