import { BadRequestException, NotFoundException } from '@nestjs/common';

export class IsbnAlreadyExists extends BadRequestException {
  constructor(isbn: string) {
    super(`ISBN "${isbn}" is already taken`);
  }
}

export class BookNotFound extends NotFoundException {
  constructor(id: number) {
    super(`Book with id ${id} not found`);
  }
}
