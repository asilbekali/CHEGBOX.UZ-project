import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from 'src/Guards/auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';
import { RoleDec } from 'src/user/decorator/roles.decorator';
import { Role } from 'src/user/enum/role.enum';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @RoleDec(Role.ADMIN, Role.SELLER)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto, @Req() req: any) {
    return this.productService.create(createProductDto, req);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiQuery({ name: 'location', required: false })
  @ApiQuery({ name: 'search', required: false })
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('categoryId') categoryId?: number,
    @Query('location') location?: string,
    @Query('search') search?: string,
  ) {
    return this.productService.findAll({
      page: Number(page),
      limit: Number(limit),
      categoryId: Number(categoryId),
      location,
      search,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @RoleDec(Role.ADMIN, Role.SUPER_ADMIN, Role.SELLER)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @RoleDec(Role.ADMIN, Role.SUPER_ADMIN, Role.SELLER)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
