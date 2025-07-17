import { Injectable } from '@nestjs/common';
import { CreateElonDto } from './dto/create-elon.dto';
import { UpdateElonDto } from './dto/update-elon.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ElonService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createElonDto: CreateElonDto) {
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
    return this.prisma.elon.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateElonDto: UpdateElonDto) {
    return this.prisma.elon.update({
      where: { id },
      data: updateElonDto,
    });
  }

  async remove(id: number) {
    return this.prisma.elon.delete({
      where: { id },
    });
  }
}
