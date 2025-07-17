import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateElonDto } from './dto/create-elon.dto';
import { UpdateElonDto } from './dto/update-elon.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ElonService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createElonDto: CreateElonDto) {
    const { categoryId } = createElonDto;

    // categoryId mavjudligini tekshirish
    const categoryExists = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!categoryExists) {
      throw new BadRequestException(`Kategoriya ID ${categoryId} mavjud emas`);
    }

    return this.prisma.elon.create({
      data: createElonDto,
    });
  }

  async findAll(query: {
    page?: number;
    limit?: number;
    categoryId?: number;
    search?: string;
  }) {
    const { page = 1, limit = 10, categoryId, search } = query;

    const where: any = {};

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (search) {
      where.OR = [
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    const total = await this.prisma.elon.count({ where });

    const data = await this.prisma.elon.findMany({
      where,
      skip: (page - 1) * limit,
      take: +limit,
      orderBy: { id: 'desc' },
    });

    return {
      total,
      page,
      limit,
      data,
    };
  }

  async findOne(id: number) {
    const elon = await this.prisma.elon.findUnique({
      where: { id },
    });

    if (!elon) {
      throw new NotFoundException(`ID ${id} bilan e'lon topilmadi`);
    }

    return elon;
  }

  async update(id: number, updateElonDto: UpdateElonDto) {
    const existing = await this.prisma.elon.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`ID ${id} bilan e'lon topilmadi`);
    }

    if (updateElonDto.categoryId) {
      const categoryExists = await this.prisma.category.findUnique({
        where: { id: updateElonDto.categoryId },
      });

      if (!categoryExists) {
        throw new BadRequestException(
          `Kategoriya ID ${updateElonDto.categoryId} mavjud emas`,
        );
      }
    }

    return this.prisma.elon.update({
      where: { id },
      data: updateElonDto,
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.elon.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`ID ${id} bilan e'lon topilmadi`);
    }

    return this.prisma.elon.delete({
      where: { id },
    });
  }
}
