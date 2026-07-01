import { BadRequestException, NotFoundException } from '@nestjs/common';

export class StockEntryAlreadyExists extends BadRequestException {
  constructor(bookstoreId: number, bookId: number) {
    super(`Stock entry already exists for bookstore ${bookstoreId} and book ${bookId}`);
  }
}

export class StockNotFound extends NotFoundException {
  constructor(id: number) {
    super(`Stock entry with id ${id} not found`);
  }
}
