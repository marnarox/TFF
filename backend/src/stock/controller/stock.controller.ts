import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StockService } from '../services/stock.service';
import { StockDto } from '../dto/stock.dto';
import { Stock } from '../stock.entity';

@ApiTags('Stock')
@Controller('stock')
export class StockController {
  constructor(private readonly _stockService: StockService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: StockDto.Create): Promise<Stock> {
    return this._stockService.create(body);
  }

  @Get()
  async findAll(@Query('bookstoreId', new ParseIntPipe({ optional: true })) bookstoreId?: number): Promise<Stock[]> {
    return this._stockService.findAll(bookstoreId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Stock> {
    return this._stockService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: StockDto.Update): Promise<Stock> {
    return this._stockService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this._stockService.remove(id);
  }
}
