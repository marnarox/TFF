import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { UsersModule } from '@src/users/users.module';
import { BookstoresModule } from '@src/bookstores/bookstores.module';

@Module({
  imports: [
    UsersModule,
    BookstoresModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'changeme',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule],
})
export class AuthModule {}
