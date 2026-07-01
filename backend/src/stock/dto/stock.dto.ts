import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsInt, IsNumber, IsPositive, Min } from 'class-validator';

export namespace StockDto {
  export class Create {
    @ApiProperty({ example: 1 })
    @IsInt()
    @IsPositive()
    bookstoreId: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    @IsPositive()
    bookId: number;

    @ApiProperty({ example: 10 })
    @IsInt()
    @Min(0)
    quantity: number;

    @ApiProperty({ example: 19.9 })
    @IsNumber()
    @IsPositive()
    price: number;
  }

  export class Update extends PartialType(Create) {}

  export class UpdateQuantity {
    @ApiPropertyOptional({ example: 5 })
    @IsInt()
    @Min(0)
    quantity: number;
  }
}
