import { UserRole } from '@src/_shared/enums/user-role.enum';
import { AuthDto } from '../dto/auth.dto';
import { UserEntity } from '@src/users/user.entity';
import { Bookstore } from '@src/bookstores/bookstores.entity';

export function toUser(dto: AuthDto.UserRegister): Omit<UserEntity, 'id'> {
  const user = new UserEntity();
  user.username = dto.username;
  user.email = dto.email;
  user.password = dto.password;
  user.role = UserRole.User;
  return user;
}

export function toBookstore(dto: AuthDto.BookstoreRegister): Omit<Bookstore, 'id'> {
  const bookstore = new Bookstore();
  bookstore.name = dto.name;
  bookstore.email = dto.email;
  bookstore.password = dto.password;
  bookstore.numeroEntreprise = dto.numeroEntreprise;
  bookstore.ville = dto.ville;
  bookstore.codePostal = dto.codePostal;
  bookstore.telephone = dto.telephone;
  bookstore.siteWeb = dto.siteWeb ?? null;
  bookstore.isVerified = false;
  bookstore.livraisonPossible = false;
  return bookstore;
}
