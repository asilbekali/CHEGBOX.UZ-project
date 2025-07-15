import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/Guards/auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { RoleDec } from 'src/user/decorator/roles.decorator';
import { Role } from 'src/user/enum/role.enum';

@ApiTags('Region')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  // @RoleDec(Role.ADMIN, Role.SUPER_ADMIN)
  // @UseGuards(RolesGuard)
  // @UseGuards(AuthGuard)
  @Post()
  @ApiOperation({ summary: 'Yangi region yaratish' })
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha regionlarni olish' })
  findAll() {
    return this.regionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID orqali bitta regionni olish' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.regionService.findOne(id);
  }

  @RoleDec(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Regionni yangilash' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRegionDto: UpdateRegionDto,
  ) {
    return this.regionService.update(id, updateRegionDto);
  }

  @RoleDec(Role.ADMIN, Role.SUPER_ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Regionni o‘chirish' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.regionService.remove(id);
  }
}
