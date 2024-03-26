import { AuthorizationCode } from '@node-oauth/oauth2-server';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OAuthClients } from './oauth-clients.entity';
import { Users } from 'src/users/users.entity';

/**
 * Represents an entity for OAuth authorization codes.
 */
@Entity('oauth_authorisation_codes')
export class OAuthAuthorisationCodes implements AuthorizationCode {
  /**
   * The unique identifier of the authorization code.
   */
  @PrimaryGeneratedColumn('uuid')
  id: number;

  /**
   * The authorization code string.
   */
  @Column('text')
  authorizationCode: string;

  /**
   * The OAuth client associated with the authorization code.
   */
  @ManyToOne(() => OAuthClients, (client) => client.authorizationCodes)
  @JoinColumn({ name: 'clientId' })
  client: OAuthClients;

  /**
   * The user associated with the authorization code.
   */
  @ManyToOne(() => Users, (user) => user.authorizationCodes)
  @JoinColumn({ name: 'userId' })
  user: Users;

  /**
   * The redirect URI associated with the authorization code.
   */
  @Column('text')
  redirectUri: string;

  /**
   * The expiration date and time of the authorization code.
   */
  @Column('timestamp without time zone')
  expiresAt: Date;

  /**
   * The scope(s) of the authorization code.
   */
  @Column('text', { array: true })
  scope: string[];

  /**
   * The code challenge string used for PKCE (Proof Key for Code Exchange).
   */
  @Column('text')
  codeChallenge?: string;

  /**
   * The code challenge method used for PKCE (Proof Key for Code Exchange).
   */
  @Column('text')
  codeChallengeMethod?: string;
}
