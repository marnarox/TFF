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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookService } from '../services/book.service';
import { BookDto } from '../dto/book.dto';
import { Book } from '../book.entity';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private readonly _bookService: BookService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: BookDto.Create): Promise<Book> {
    return this._bookService.create(body);
  }

  @Get()
  async findAll(): Promise<Book[]> {
    return this._bookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Book> {
    return this._bookService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: BookDto.Update): Promise<Book> {
    return this._bookService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this._bookService.remove(id);
  }
}
