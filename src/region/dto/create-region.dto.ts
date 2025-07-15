import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRegionDto {
  @ApiProperty({
    example: 'Fargona',
    description: 'Hudud (viloyat) nomi. Unikal bo‘lishi kerak.',
  })
  @IsString()
  name: string;
}
