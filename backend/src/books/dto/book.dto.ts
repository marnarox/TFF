import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator';

export namespace BookDto {
  export class Create {
    @ApiProperty({ example: '978-2-07-036822-8' })
    @IsString()
    @IsNotEmpty()
    isbn: string;

    @ApiProperty({ example: 'Le Petit Prince' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'Antoine de Saint-Exupéry' })
    @IsString()
    @IsNotEmpty()
    auteur: string;

    @ApiProperty({ example: 1943 })
    @IsInt()
    @Min(0)
    @Max(new Date().getFullYear())
    publishedYear: number;

    @ApiPropertyOptional({ example: 'https://example.com/cover.jpg' })
    @IsUrl()
    @IsOptional()
    coverUrl?: string;

    @ApiProperty({ example: 'Gallimard' })
    @IsString()
    @IsNotEmpty()
    publisher: string;
  }

  export class Update extends PartialType(Create) {}
}
