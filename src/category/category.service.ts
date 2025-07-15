import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const existing = await this.prisma.category.findUnique({
        where: { name: createCategoryDto.name },
      });

      if (existing) {
        throw new BadRequestException(
          'Bu nomdagi kategoriya allaqachon mavjud',
        );
      }

      return await this.prisma.category.create({
        data: {
          name: createCategoryDto.name,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Kategoriya yaratishda xatolik yuz berdi',
      );
    }
  }

  async findAll({
    page = 1,
    limit = 10,
    search,
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    try {
      const skip = (page - 1) * limit;

      const where = search
        ? {
            name: {
              contains: search,
              mode: Prisma.QueryMode.insensitive, // ✅ Enum sifatida ishlatilmoqda
            },
          }
        : {};

      const [data, total] = await Promise.all([
        this.prisma.category.findMany({
          where,
          skip,
          take: limit,
          include: { products: true },
        }),
        this.prisma.category.count({ where }),
      ]);

      return {
        data,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Kategoriyalarni olishda xatolik yuz berdi',
      );
    }
  }

  async findOne(id: number) {
    try {
      const category = await this.prisma.category.findUnique({
        where: { id },
        include: {
          products: true,
        },
      });

      if (!category) {
        throw new NotFoundException(`ID ${id} bilan kategoriya topilmadi`);
      }

      return category;
    } catch (error) {
      throw new InternalServerErrorException(
        'Kategoriya topishda xatolik yuz berdi',
      );
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const existing = await this.prisma.category.findUnique({ where: { id } });

      if (!existing) {
        throw new NotFoundException(`ID ${id} bilan kategoriya topilmadi`);
      }

      return await this.prisma.category.update({
        where: { id },
        data: updateCategoryDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Kategoriya yangilashda xatolik yuz berdi',
      );
    }
  }

  async remove(id: number) {
    try {
      const existing = await this.prisma.category.findUnique({ where: { id } });

      if (!existing) {
        throw new NotFoundException(`ID ${id} bilan kategoriya topilmadi`);
      }

      return await this.prisma.category.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Kategoriya o‘chirishda xatolik yuz berdi',
      );
    }
  }
}
