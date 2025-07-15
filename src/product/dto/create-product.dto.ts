import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDateString, IsInt } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'MacBook Air M2',
    description: 'Mahsulot nomi',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'https://example.com/images/macbook.jpg',
    description: 'Mahsulot rasmi URL manzili',
  })
  @IsString()
  image: string;

  @ApiProperty({
    example: 'Yangi avlod M2 chipli MacBook Air 2024',
    description: 'Mahsulot haqida batafsil maʼlumot',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 1500.0,
    description: 'Mahsulotning eski narxi',
  })
  @IsNumber()
  oldPrice: number;

  @ApiProperty({
    example: 1350.0,
    description: 'Mahsulotning hozirgi narxi',
  })
  @IsNumber()
  newPrice: number;

  @ApiProperty({
    example: 150.0,
    description: 'Chegirma summasi',
  })
  @IsNumber()
  discountAmount: number;

  @ApiProperty({
    example: 'fixed',
    description: 'Chegirma turi: "fixed" yoki "percentage"',
  })
  @IsString()
  discountType: string;

  @ApiProperty({
    example: '2025-12-31T23:59:59.000Z',
    description: 'Chegirma amal qilish muddati',
  })
  @IsDateString()
  expiryDate: string;

  @ApiProperty({
    example: 'Toshkent',
    description: 'Mahsulot joylashuvi',
  })
  @IsString()
  location: string;

  @ApiProperty({
    example: 3,
    description: 'Tegishli kategoriya ID raqami',
  })
  @IsInt()
  categoryId: number;
}
