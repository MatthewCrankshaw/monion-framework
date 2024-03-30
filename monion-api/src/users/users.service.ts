import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async registerUser(user: Users): Promise<Users> {
    const newUser = this.usersRepository.create(user);
    await this.usersRepository.save(newUser);
    return newUser;
  }
}
