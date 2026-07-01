import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from '../stock.entity';
import { StockEntryAlreadyExists, StockNotFound } from '../exceptions/stock.exception';
import { StockDto } from '../dto/stock.dto';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly _stockRepo: Repository<Stock>,
  ) {}

  async create(dto: StockDto.Create): Promise<Stock> {
    const existing = await this._stockRepo.findOne({
      where: { bookstoreId: dto.bookstoreId, bookId: dto.bookId },
    });
    if (existing) {
      throw new StockEntryAlreadyExists(dto.bookstoreId, dto.bookId);
    }
    return this._stockRepo.save(dto);
  }

  async findAll(bookstoreId?: number): Promise<Stock[]> {
    if (bookstoreId) {
      return this._stockRepo.find({ where: { bookstoreId } });
    }
    return this._stockRepo.find();
  }

  async findOne(id: number): Promise<Stock> {
    const stock = await this._stockRepo.findOne({ where: { id } });
    if (!stock) {
      throw new StockNotFound(id);
    }
    return stock;
  }

  async update(id: number, dto: StockDto.Update): Promise<Stock> {
    const stock = await this.findOne(id);
    Object.assign(stock, dto);
    return this._stockRepo.save(stock);
  }

  async remove(id: number): Promise<void> {
    const stock = await this.findOne(id);
    await this._stockRepo.remove(stock);
  }
}
