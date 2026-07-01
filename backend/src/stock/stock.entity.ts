import { Bookstore } from '@src/bookstores/bookstores.entity';
import { Book } from '@src/books/book.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'stock' })
@Unique(['bookstoreId', 'bookId'])
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Bookstore, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookstore_id' })
  bookstore: Bookstore;

  @Column({ name: 'bookstore_id' })
  bookstoreId: number;

  @ManyToOne(() => Book, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @Column({ name: 'book_id' })
  bookId: number;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
}
