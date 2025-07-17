import { ApiProperty } from '@nestjs/swagger';

export class CreateElonDto {
  @ApiProperty({
    example: 'https://example.com/images/elon1.jpg',
    description: "E'lon uchun rasm URL manzili",
  })
  image: string;

  @ApiProperty({
    example: "Bu e'londa yangi kompyuter sotuvga qo'yilgan",
    description: "E'lonning qisqacha tavsifi",
  })
  description: string;

  @ApiProperty({
    example: 'Yangi kompyuter sotiladi',
    description: "E'lon sarlavhasi",
  })
  title: string;

  @ApiProperty({
    example: 3,
    description: 'Kategoriya ID raqami',
  })
  categoryId: number;
}
