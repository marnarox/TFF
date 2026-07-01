import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'bookstores' })
export class Bookstore {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ name: 'numero_entreprise', unique: true })
  numeroEntreprise: string;

  @Column({ name: 'is_verified', default: false })
  isVerified: boolean;

  @Column()
  ville: string;

  @Column({ name: 'code_postal' })
  codePostal: string;

  @Column()
  telephone: string;

  @Column({ name: 'site_web', nullable: true, type: 'varchar' })
  siteWeb: string | null;

  @Column({ name: 'livraison_possible', default: false })
  livraisonPossible: boolean;
}
