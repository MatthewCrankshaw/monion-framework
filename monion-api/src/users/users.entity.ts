import { User } from '@node-oauth/oauth2-server';
import { OAuthAuthorisationCodes } from 'src/auth/oauth-authorisation-codes.entity';
import { OAuthClients } from 'src/auth/oauth-clients.entity';
import { OAuthTokens } from 'src/auth/oauth-tokens.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

/**
 * Represents a user entity in the application.
 */
@Entity({ name: 'users' })
export class Users implements User {
  /**
   * The unique identifier for the user.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The username of the user.
   */
  @Column({ type: 'text', nullable: true })
  username: string;

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
  @OneToMany(() => OAuthClients, (client) => client.user)
  clients: OAuthClients[];

  /**
   * The OAuth tokens associated with the user.
   */
  @OneToMany(() => OAuthTokens, (token) => token.user)
  tokens: OAuthTokens[];

  /**
   * The OAuth authorization codes associated with the user.
   */
  @OneToMany(() => OAuthAuthorisationCodes, (code) => code.user)
  authorizationCodes: OAuthAuthorisationCodes[];
}
