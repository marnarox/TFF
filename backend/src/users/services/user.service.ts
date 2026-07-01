import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { UserEntity } from '../user.entity';
import { EmailAlreadyExists, UsernameAlreadyExists } from '../exceptions/user.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepo: Repository<UserEntity>,
  ) {}

  async create(user: Omit<UserEntity, 'id'>): Promise<UserEntity> {
    const existingUsername = await this._userRepo.findOne({
      where: { username: user.username },
    });
    if (existingUsername) {
      throw new UsernameAlreadyExists(user.username);
    }

    const existingEmail = await this._userRepo.findOne({
      where: { email: user.email },
    });
    if (existingEmail) {
      throw new EmailAlreadyExists(user.email);
    }

    user.password = bcrypt.hashSync(user.password, 14);

    return this._userRepo.save(user);
  }

  async login(identifier: { username?: string; email?: string }, password: string): Promise<UserEntity> {
    const where = identifier.username ? { username: identifier.username } : { email: identifier.email };
    const user = await this._userRepo.findOne({ where });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async findById(id: number): Promise<UserEntity | null> {
    return this._userRepo.findOne({ where: { id } });
  }
}
