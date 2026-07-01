import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wishlist } from './wishlist.entity';
import { WishlistService } from './services/wishlist.service';
import { WishlistController } from './controller/wishlist.controller';
import { JwtAuthGuard } from '@src/_shared/guards/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wishlist]),
    JwtModule.register({
      secret: process.env.JWT_SECRET ?? 'changeme',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [WishlistController],
  providers: [WishlistService, JwtAuthGuard],
  exports: [WishlistService],
})
export class WishlistsModule {}
