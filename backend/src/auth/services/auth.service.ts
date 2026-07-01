import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@src/users/services/user.service';
import { BookstoreService } from '@src/bookstores/services/bookstore.service';
import { UserRole } from '@src/_shared/enums/user-role.enum';
import { AuthDto } from '../dto/auth.dto';
import { toBookstore, toUser } from '../mappers/auth.mapper';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _bookstoreService: BookstoreService,
    private readonly _jwtService: JwtService,
  ) {}

  async registerUser(dto: AuthDto.UserRegister): Promise<void> {
    await this._userService.create(toUser(dto));
  }

  async loginUser(dto: AuthDto.UserLogin): Promise<AuthDto.TokenResponse> {
    const user = await this._userService.login(
      { username: dto.username, email: dto.email },
      dto.password,
    );
    const token = this._jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
    return { token };
  }

  async registerBookstore(dto: AuthDto.BookstoreRegister): Promise<void> {
    await this._bookstoreService.create(toBookstore(dto));
  }

  async loginBookstore(dto: AuthDto.BookstoreLogin): Promise<AuthDto.TokenResponse> {
    const bookstore = await this._bookstoreService.login(dto.email, dto.password);
    const token = this._jwtService.sign({
      sub: bookstore.id,
      email: bookstore.email,
      role: UserRole.Bookstore,
    });
    return { token };
  }
}
