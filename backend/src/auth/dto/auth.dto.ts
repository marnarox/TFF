import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export namespace AuthDto {
  export class UserRegister {
    @ApiProperty({ example: 'john_doe', minLength: 2, maxLength: 32 })
    @IsString()
    @MinLength(2)
    @MaxLength(32)
    username: string;

    @ApiProperty({ example: 'john@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'password123', minLength: 8 })
    @IsString()
    @MinLength(8)
    password: string;
  }

  export class UserLogin {
    @ApiPropertyOptional({ example: 'john_doe' })
    @IsString()
    @IsOptional()
    username?: string;

    @ApiPropertyOptional({ example: 'john@example.com' })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({ example: 'password123' })
    @IsString()
    @IsNotEmpty()
    password: string;
  }

  export class BookstoreRegister {
    @ApiProperty({ example: 'Librairie du Parc' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'contact@librairieduparc.be' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'password123', minLength: 8 })
    @IsString()
    @MinLength(8)
    password: string;

    @ApiProperty({ example: 'BE0123456789' })
    @IsString()
    @IsNotEmpty()
    numeroEntreprise: string;

    @ApiProperty({ example: 'Liège' })
    @IsString()
    @IsNotEmpty()
    ville: string;

    @ApiProperty({ example: '4000' })
    @IsString()
    @IsNotEmpty()
    codePostal: string;

    @ApiProperty({ example: '+32 4 123 45 67' })
    @IsString()
    @IsNotEmpty()
    telephone: string;

    @ApiPropertyOptional({ example: 'https://librairieduparc.be' })
    @IsString()
    @IsOptional()
    siteWeb?: string;
  }

  export class BookstoreLogin {
    @ApiProperty({ example: 'contact@librairieduparc.be' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'password123' })
    @IsString()
    @IsNotEmpty()
    password: string;
  }

  export class TokenResponse {
    @ApiProperty()
    token: string;
  }
}
