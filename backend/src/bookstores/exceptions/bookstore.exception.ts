import { BadRequestException } from '@nestjs/common';

export class BookstoreEmailAlreadyExists extends BadRequestException {
  constructor(email: string) {
    super(`Email "${email}" is already taken`);
  }
}

export class BookstoreNumeroEntrepriseAlreadyExists extends BadRequestException {
  constructor(numeroEntreprise: string) {
    super(`Numéro d'entreprise "${numeroEntreprise}" is already taken`);
  }
}
