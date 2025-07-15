import { Role } from '@prisma/client';
import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Asilbek Abdugafforov',
    description: 'Foydalanuvchi to‘liq ismi',
  })
  @IsString()
  full_name: string;

  @ApiProperty({
    example: 'asilbek@example.com',
    description: 'Foydalanuvchi email manzili',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '998901234567',
    description:
      'Foydalanuvchining telefon raqami (raqam ko‘rinishida, string ham bo‘lishi mumkin)',
  })
  @IsString() // telefon raqamlar uchun string ishlatish yaxshiroq
  phone: string;

  @ApiProperty({
    example: 'securePassword123',
    description: 'Foydalanuvchi paroli',
  })
  @IsString()
  password: string;

  // @ApiProperty({
  //   example: 'USER',
  //   description: 'Foydalanuvchi roli (ADMIN, USER, SUPER_ADMIN, SELLER)',
  //   enum: Role,
  // })
  // @IsEnum(Role)
  // role: Role;

  @ApiProperty({
    example: 1,
    description: 'Viloyat ID raqami (Region jadvalidan)',
  })
  @IsNumber()
  region: number;
}
