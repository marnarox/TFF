import { BadRequestException, NotFoundException } from '@nestjs/common';

export class WishlistEntryAlreadyExists extends BadRequestException {
  constructor(bookId: number) {
    super(`Book ${bookId} is already in the wishlist`);
  }
}

export class WishlistEntryNotFound extends NotFoundException {
  constructor(bookId: number) {
    super(`Book ${bookId} is not in the wishlist`);
  }
}
