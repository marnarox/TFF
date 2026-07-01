import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookstore } from './bookstores.entity';
import { BookstoreService } from './services/bookstore.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bookstore])],
  providers: [BookstoreService],
  exports: [BookstoreService],
})
export class BookstoresModule {}
