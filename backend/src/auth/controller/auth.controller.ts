import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { AuthDto } from '../dto/auth.dto';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('user/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User registered' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Username already taken' })
  async registerUser(@Body() body: AuthDto.UserRegister): Promise<void> {
    await this._authService.registerUser(body);
  }

  @Post('user/login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: AuthDto.TokenResponse })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid credentials' })
  async loginUser(@Body() body: AuthDto.UserLogin): Promise<AuthDto.TokenResponse> {
    return this._authService.loginUser(body);
  }

  @Post('bookstore/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Bookstore registered' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Email or company number already taken' })
  async registerBookstore(@Body() body: AuthDto.BookstoreRegister): Promise<void> {
    await this._authService.registerBookstore(body);
  }

  @Post('bookstore/login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: AuthDto.TokenResponse })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid credentials' })
  async loginBookstore(@Body() body: AuthDto.BookstoreLogin): Promise<AuthDto.TokenResponse> {
    return this._authService.loginBookstore(body);
  }
}
