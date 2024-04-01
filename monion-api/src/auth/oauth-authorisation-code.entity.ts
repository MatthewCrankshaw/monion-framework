import { AuthorizationCode } from '@node-oauth/oauth2-server';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OAuthClientEntity } from './oauth-client.entity';
import { UserEntity } from 'src/users/user.entity';

/**
 * Represents an entity for OAuth authorization codes.
 */
@Entity('oauth_authorisation_codes')
export class OAuthAuthorisationCodeEntity implements AuthorizationCode {
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
  @ManyToOne(() => OAuthClientEntity, (client) => client.authorizationCodes)
  @JoinColumn({ name: 'clientId' })
  client: OAuthClientEntity;

  /**
   * The user associated with the authorization code.
   */
  @ManyToOne(() => UserEntity, (user) => user.authorizationCodes)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

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
