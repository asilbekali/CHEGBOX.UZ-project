import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { name, image } = createCategoryDto;

    if (typeof name !== 'string' || typeof image !== 'string') {
      throw new BadRequestException(
        'name va image qiymatlari string formatda bo‘lishi kerak',
      );
    }

    try {
      const existing = await this.prisma.category.findUnique({
        where: { name },
      });

      if (existing) {
        throw new BadRequestException(
          `Kategoriya "${name}" nomi bilan allaqachon mavjud`,
        );
      }

      return await this.prisma.category.create({
        data: { name, image },
      });
    } catch (error) {
      console.error('Create error:', error);
      throw new InternalServerErrorException(
        'Kategoriya yaratishda kutilmagan xatolik yuz berdi',
      );
    }
  }

  async findAll(query: { page?: number; limit?: number; search?: string }) {
    try {
      let { page = 1, limit = 10, search } = query;

      page = +page;
      limit = +limit;

      if (isNaN(page) || page < 1) page = 1;
      if (isNaN(limit) || limit < 1) limit = 10;

      const skip = (page - 1) * limit;

      const where = search
        ? {
            name: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          }
        : {};

      const [data, total] = await Promise.all([
        this.prisma.category.findMany({
          where,
          skip,
          take: limit,
          include: {
            products: true,
          },
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
      console.error('FindAll error:', error);
      throw new InternalServerErrorException(
        'Kategoriyalarni olishda xatolik yuz berdi',
      );
    }
  }

  async findOne(id: number) {
    if (!Number.isInteger(id)) {
      throw new BadRequestException('ID raqami noto‘g‘ri formatda');
    }

    try {
      const category = await this.prisma.category.findUnique({
        where: { id },
        include: { products: true },
      });

      if (!category) {
        throw new NotFoundException(`ID ${id} bilan kategoriya topilmadi`);
      }

      return category;
    } catch (error) {
      console.error('FindOne error:', error);
      throw new InternalServerErrorException(
        'Kategoriya topishda xatolik yuz berdi',
      );
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    if (!Number.isInteger(id)) {
      throw new BadRequestException('ID raqami noto‘g‘ri formatda');
    }

    try {
      const existing = await this.prisma.category.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new NotFoundException(`ID ${id} bilan kategoriya topilmadi`);
      }

      const { name, image } = updateCategoryDto;

      if (name && typeof name !== 'string') {
        throw new BadRequestException('name faqat string bo‘lishi kerak');
      }

      if (image && typeof image !== 'string') {
        throw new BadRequestException('image faqat string bo‘lishi kerak');
      }

      return await this.prisma.category.update({
        where: { id },
        data: { name, image },
      });
    } catch (error) {
      console.error('Update error:', error);
      throw new InternalServerErrorException(
        'Kategoriya yangilashda xatolik yuz berdi',
      );
    }
  }

  async remove(id: number) {
    if (!Number.isInteger(id)) {
      throw new BadRequestException('ID raqami noto‘g‘ri formatda');
    }

    try {
      const existing = await this.prisma.category.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new NotFoundException(`ID ${id} bilan kategoriya topilmadi`);
      }

      await this.prisma.category.delete({ where: { id } });

      return {
        message: `ID ${id} dagi kategoriya muvaffaqiyatli o‘chirildi`,
        success: true,
      };
    } catch (error) {
      console.error('Remove error:', error);
      throw new InternalServerErrorException(
        'Kategoriya o‘chirishda xatolik yuz berdi',
      );
    }
  }
}
