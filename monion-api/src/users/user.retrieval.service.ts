import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserDto } from './user.dto';

export class UserRetrievalService {
  constructor(private readonly repository: Repository<UserEntity>) {}

  public async getById(id: string): Promise<UserDto> {
    const userEntity = await this.repository.findOne({ where: { id } });

    if (userEntity instanceof UserEntity) {
      return new UserDto(userEntity);
    }
    throw new Error('User not found');
  }
}
