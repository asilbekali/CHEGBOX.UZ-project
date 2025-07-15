import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto, req: Request) {
    const user = req.user; // ✅ Kengaytirilgan type orqali user mavjud

    if (!user) {
      throw new BadRequestException('JWT token in user empty !');
    }

    return await this.prisma.product.create({
      data: {
        ...createProductDto,
        userId: user.id, // JWT dan olingan foydalanuvchi ID
      },
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      include: {
        user: true,
        category: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        user: true,
        category: true,
      },
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
