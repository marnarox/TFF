import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from '../wishlist.entity';
import { WishlistEntryAlreadyExists, WishlistEntryNotFound } from '../exceptions/wishlist.exception';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly _wishlistRepo: Repository<Wishlist>,
  ) {}

  async add(userId: number, bookId: number): Promise<Wishlist> {
    const existing = await this._wishlistRepo.findOne({ where: { userId, bookId } });
    if (existing) {
      throw new WishlistEntryAlreadyExists(bookId);
    }
    return this._wishlistRepo.save({ userId, bookId });
  }

  async findAllForUser(userId: number): Promise<Wishlist[]> {
    return this._wishlistRepo.find({ where: { userId }, relations: ['book'] });
  }

  async remove(userId: number, bookId: number): Promise<void> {
    const existing = await this._wishlistRepo.findOne({ where: { userId, bookId } });
    if (!existing) {
      throw new WishlistEntryNotFound(bookId);
    }
    await this._wishlistRepo.remove(existing);
  }
}
