import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { Bookstore } from '../bookstores.entity';
import {
  BookstoreEmailAlreadyExists,
  BookstoreNumeroEntrepriseAlreadyExists,
} from '../exceptions/bookstore.exception';

@Injectable()
export class BookstoreService {
  constructor(
    @InjectRepository(Bookstore)
    private readonly _bookstoreRepo: Repository<Bookstore>,
  ) {}

  async create(bookstore: Omit<Bookstore, 'id'>): Promise<Bookstore> {
    const existingEmail = await this._bookstoreRepo.findOne({
      where: { email: bookstore.email },
    });
    if (existingEmail) {
      throw new BookstoreEmailAlreadyExists(bookstore.email);
    }

    const existingNumero = await this._bookstoreRepo.findOne({
      where: { numeroEntreprise: bookstore.numeroEntreprise },
    });
    if (existingNumero) {
      throw new BookstoreNumeroEntrepriseAlreadyExists(bookstore.numeroEntreprise);
    }

    bookstore.password = bcrypt.hashSync(bookstore.password, 14);

    return this._bookstoreRepo.save(bookstore);
  }

  async login(email: string, password: string): Promise<Bookstore> {
    const bookstore = await this._bookstoreRepo.findOne({ where: { email } });
    if (!bookstore || !bcrypt.compareSync(password, bookstore.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return bookstore;
  }

  async findById(id: number): Promise<Bookstore | null> {
    return this._bookstoreRepo.findOne({ where: { id } });
  }
}
