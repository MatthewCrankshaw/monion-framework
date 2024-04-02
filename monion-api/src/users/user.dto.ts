import {
  IsString,
  IsEmail,
  MinLength,
  IsNotEmpty,
  Length,
  IsOptional,
  IsDate,
} from 'class-validator';
import { UserEntity } from './user.entity';

export class UserDto {
  constructor(entity: UserEntity) {
    if (entity instanceof UserEntity) {
      this.id = entity.id;
      this.createdAt = entity.createdAt;
      this.updatedAt = entity.updatedAt;
      this.email = entity.email;
      this.password = entity.password;
    }
  }

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(36, 36)
  id: string;

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
