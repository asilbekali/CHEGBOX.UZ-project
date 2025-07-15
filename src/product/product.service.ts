import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Request } from 'express';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto, req: Request) {
    const user = req.user;

    if (!user) {
      throw new BadRequestException('JWT token in user empty!');
    }

    return await this.prisma.product.create({
      data: {
        ...createProductDto,
        userId: user.id,
      },
    });
  }

  async findAll(query: {
    page?: number;
    limit?: number;
    categoryId?: number;
    location?: string;
    search?: string;
  }) {
    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 ? query.limit : 10;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (query.categoryId) {
      where.categoryId = query.categoryId;
    }

    if (query.location) {
      where.location = {
        contains: query.location,
        mode: 'insensitive',
      };
    }

    if (query.search) {
      where.OR = [
        {
          name: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
      ];
    }

    const [products, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: true,
          category: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: products,
    };
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
