import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateRegionDto) {
    try {
      const existing = await this.prisma.region.findUnique({
        where: { name: dto.name },
      });

      if (existing) {
        throw new BadRequestException('Bunday nomli region allaqachon mavjud');
      }

      return await this.prisma.region.create({
        data: {
          name: dto.name,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || 'Region yaratishda xatolik yuz berdi',
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.region.findMany({
        orderBy: { id: 'asc' },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Regionlarni olishda xatolik yuz berdi',
      );
    }
  }

  async findOne(id: number) {
    try {
      const region = await this.prisma.region.findUnique({
        where: { id },
      });

      if (!region) {
        throw new NotFoundException(`Region ID ${id} topilmadi`);
      }

      return region;
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || `Regionni olishda xatolik yuz berdi`,
      );
    }
  }

  async update(id: number, dto: UpdateRegionDto) {
    try {
      const region = await this.prisma.region.findUnique({ where: { id } });

      if (!region) {
        throw new NotFoundException(`Region ID ${id} topilmadi`);
      }

      return await this.prisma.region.update({
        where: { id },
        data: {
          name: dto.name ?? region.name,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || `Regionni yangilashda xatolik yuz berdi`,
      );
    }
  }

  async remove(id: number) {
    try {
      const region = await this.prisma.region.findUnique({ where: { id } });

      if (!region) {
        throw new NotFoundException(`Region ID ${id} topilmadi`);
      }

      await this.prisma.region.delete({ where: { id } });

      return { message: `Region ID ${id} muvaffaqiyatli o‘chirildi` };
    } catch (error) {
      throw new InternalServerErrorException(
        error.message || `Regionni o‘chirishda xatolik yuz berdi`,
      );
    }
  }
}
