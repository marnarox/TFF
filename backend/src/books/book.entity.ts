import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'books' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  isbn: string;

  @Column()
  name: string;

  @Column()
  auteur: string;

  @Column({ name: 'published_year' })
  publishedYear: number;

  @Column({ name: 'cover_url', nullable: true, type: 'varchar' })
  coverUrl: string | null;

  @Column()
  publisher: string;
}
