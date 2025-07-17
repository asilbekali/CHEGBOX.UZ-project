import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ElonService } from './elon.service';
import { CreateElonDto } from './dto/create-elon.dto';
import { UpdateElonDto } from './dto/update-elon.dto';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('Elonlar')
@Controller('elon')
export class ElonController {
  constructor(private readonly elonService: ElonService) {}

  @Post()
  create(@Body() createElonDto: CreateElonDto) {
    return this.elonService.create(createElonDto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'categoryId', required: false, example: 3 })
  @ApiQuery({ name: 'search', required: false, example: 'kompyuter' })
  findAll(@Query() query: any) {
    return this.elonService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.elonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateElonDto: UpdateElonDto) {
    return this.elonService.update(+id, updateElonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.elonService.remove(+id);
  }
}
