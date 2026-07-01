import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../book.entity';
import { BookNotFound, IsbnAlreadyExists } from '../exceptions/book.exception';
import { BookDto } from '../dto/book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly _bookRepo: Repository<Book>,
  ) {}

  async create(dto: BookDto.Create): Promise<Book> {
    const existing = await this._bookRepo.findOne({ where: { isbn: dto.isbn } });
    if (existing) {
      throw new IsbnAlreadyExists(dto.isbn);
    }
    return this._bookRepo.save({ ...dto, coverUrl: dto.coverUrl ?? null });
  }

  async findAll(): Promise<Book[]> {
    return this._bookRepo.find();
  }

  async findOne(id: number): Promise<Book> {
    const book = await this._bookRepo.findOne({ where: { id } });
    if (!book) {
      throw new BookNotFound(id);
    }
    return book;
  }

  async update(id: number, dto: BookDto.Update): Promise<Book> {
    const book = await this.findOne(id);
    Object.assign(book, dto);
    return this._bookRepo.save(book);
  }

  async remove(id: number): Promise<void> {
    const book = await this.findOne(id);
    await this._bookRepo.remove(book);
  }
}
