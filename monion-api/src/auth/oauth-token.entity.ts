import { Client, Token } from '@node-oauth/oauth2-server';
import { UserEntity } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OAuthClientEntity } from './oauth-client.entity';

/**
 * Represents an OAuth token entity.
 */
@Entity('oauth_tokens')
export class OAuthTokenEntity implements Token {
  /**
   * The unique identifier of the token.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The date and time when the token was created.
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * The date and time when the token was last updated.
   */
  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * The access token string.
   */
  @Column('text')
  accessToken: string;

  /**
   * The expiration date and time of the access token.
   */
  @Column('timestamp without time zone')
  accessTokenExpiresAt: Date;

  /**
   * The refresh token string.
   */
  @Column('text')
  refreshToken: string;

  /**
   * The expiration date and time of the refresh token.
   */
  @Column('timestamp without time zone')
  refreshTokenExpiresAt: Date;

  /**
   * The scope of the token.
   */
  @Column('text', { array: true })
  scope: string[];

  /**
   * The OAuth client associated with the token.
   */
  @ManyToOne(() => OAuthClientEntity, (client) => client.tokens)
  @JoinColumn({ name: 'clientId' })
  client: Client;

  /**
   * The user associated with the token.
   */
  @ManyToOne(() => UserEntity, (user) => user.tokens)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
