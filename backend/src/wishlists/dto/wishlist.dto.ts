import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export namespace WishlistDto {
  export class Create {
    @ApiProperty({ example: 1 })
    @IsInt()
    @IsPositive()
    bookId: number;
  }
}
