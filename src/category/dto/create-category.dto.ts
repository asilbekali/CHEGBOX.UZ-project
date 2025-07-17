import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Electronics',
    description: 'Kategoriya nomi, yagona bo‘lishi kerak (unique)',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'https://example.com/images/electronics.jpg',
    description: 'Kategoriya uchun rasm URL manzili',
  })
  @IsNotEmpty()
  @IsString()
  image: string;
}
