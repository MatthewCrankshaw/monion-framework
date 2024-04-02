import { User as UserInterface } from '@node-oauth/oauth2-server';
import { OAuthAuthorisationCodeEntity } from 'src/auth/oauth-authorisation-code.entity';
import { OAuthClientEntity } from 'src/auth/oauth-client.entity';
import { OAuthTokenEntity } from 'src/auth/oauth-token.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserDto } from './user.dto';

/**
 * Represents a user entity in the application.
 */
@Entity({ name: 'users' })
export class UserEntity implements UserInterface {
  constructor(dto: UserDto) {
    if (dto !== undefined) {
      this.id = dto.id;
      this.createdAt = dto.createdAt;
      this.updatedAt = dto.updatedAt;
      this.email = dto.email;
      this.password = dto.password;
    }
  }

  /**
   * The unique identifier for the user.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The username of the user.
   */
  @Column({ type: 'text', nullable: true })
  email: string;

  /**
   * The encrypted password of the user.
   */
  @Column({ type: 'text', nullable: true })
  password: string;

  /**
   * The date and time when the user was created.
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * The date and time when the user was last updated.
   */
  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * The OAuth clients associated with the user.
   */
  @OneToMany(() => OAuthClientEntity, (client) => client.user)
  clients: OAuthClientEntity[];

  /**
   * The OAuth tokens associated with the user.
   */
  @OneToMany(() => OAuthTokenEntity, (token) => token.user)
  tokens: OAuthTokenEntity[];

  /**
   * The OAuth authorization codes associated with the user.
   */
  @OneToMany(() => OAuthAuthorisationCodeEntity, (code) => code.user)
  authorizationCodes: OAuthAuthorisationCodeEntity[];
}
