import { BadRequestException } from '@nestjs/common';

export class UsernameAlreadyExists extends BadRequestException {
  constructor(username: string) {
    super(`Username "${username}" is already taken`);
  }
}

export class EmailAlreadyExists extends BadRequestException {
  constructor(email: string) {
    super(`Email "${email}" is already taken`);
  }
}
