import { Client } from '@node-oauth/oauth2-server';
import { UserEntity } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OAuthTokenEntity } from './oauth-token.entity';
import { OAuthAuthorisationCodeEntity } from './oauth-authorisation-code.entity';

/**
 * Represents an OAuth client entity.
 */
@Entity('oauth_clients')
export class OAuthClientEntity implements Client {
  /**
   * The unique identifier of the client.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The creation date of the client.
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * The last update date of the client.
   */
  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * The client ID.
   */
  @Column('text')
  clientId: string;

  /**
   * The client secret.
   */
  @Column('text')
  clientSecret: string;

  /**
   * The client name.
   */
  @Column('text')
  clientName: string;

  /**
   * The redirect URIs of the client.
   */
  @Column('text', { name: 'redirectUri' })
  redirectUris: string;

  /**
   * The allowed grants of the client.
   */
  @Column('text', { array: true })
  grants: string[];

  /**
   * The scopes of the client.
   */
  @Column('text', { array: true })
  scope: string[];

  /**
   * The user associated with the client.
   */
  @ManyToOne(() => UserEntity, (user) => user.clients, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  /**
   * The tokens issued to the client.
   */
  @OneToMany(() => OAuthTokenEntity, (token) => token.client)
  tokens: OAuthTokenEntity[];

  /**
   * The authorization codes issued to the client.
   */
  @OneToMany(() => OAuthAuthorisationCodeEntity, (code) => code.client)
  authorizationCodes: OAuthAuthorisationCodeEntity[];
}
