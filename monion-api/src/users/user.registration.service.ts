import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { UserDto } from './user.dto';
import { ValidationError } from 'src/error/validation.error';

@Injectable()
export class UserRegistrationService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  public async registerUser(user: UserDto): Promise<UserEntity> {
    await this.checkUsernameUnique(user.username);

    user.password = await this.encryptPassword(user);
    const newUser = this.createUser(user);
    return await this.usersRepository.save(newUser);
  }

  protected async checkUsernameUnique(username: string): Promise<void> {
    const existingUser = await this.usersRepository.findOne({
      where: { username },
    });

    if (existingUser instanceof UserEntity) {
      throw new ValidationError('Username is already taken');
    }
  }

  protected createUser(user: UserDto): UserEntity {
    const entity = new UserEntity(user);
    return this.usersRepository.create(entity);
  }

  protected async encryptPassword(user: UserDto): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    return hashedPassword;
  }
}
