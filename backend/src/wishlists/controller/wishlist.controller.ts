import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@src/_shared/decorators/current-user.decorator';
import { JwtAuthGuard } from '@src/_shared/guards/jwt-auth.guard';
import type { JwtPayload } from '@src/_shared/guards/jwt-auth.guard';
import { WishlistService } from '../services/wishlist.service';
import { WishlistDto } from '../dto/wishlist.dto';
import { Wishlist } from '../wishlist.entity';

@ApiTags('Wishlists')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('wishlists')
export class WishlistController {
  constructor(private readonly _wishlistService: WishlistService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async add(@CurrentUser() user: JwtPayload, @Body() body: WishlistDto.Create): Promise<Wishlist> {
    return this._wishlistService.add(user.sub, body.bookId);
  }

  @Get()
  async findAll(@CurrentUser() user: JwtPayload): Promise<Wishlist[]> {
    return this._wishlistService.findAllForUser(user.sub);
  }

  @Delete(':bookId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@CurrentUser() user: JwtPayload, @Param('bookId', ParseIntPipe) bookId: number): Promise<void> {
    await this._wishlistService.remove(user.sub, bookId);
  }
}
