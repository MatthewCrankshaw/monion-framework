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

  public async registerUser(user: UserDto): Promise<UserDto> {
    await this.checkUsernameUnique(user.username);

    user.password = await this.encryptPassword(user);
    const newUser = await this.createUser(user);
    return new UserDto(newUser);
  }

  protected async checkUsernameUnique(username: string): Promise<void> {
    const existingUser = await this.usersRepository.findOne({
      where: { username },
    });

    if (existingUser instanceof UserEntity) {
      throw new ValidationError('Username is already taken');
    }
  }

  protected async createUser(user: UserDto): Promise<UserEntity> {
    const entity = new UserEntity(user);
    const savedEntity = await this.usersRepository.save(entity);
    return savedEntity;
  }

  protected async encryptPassword(user: UserDto): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    return hashedPassword;
  }
}
