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

@Entity('oauth_authorisation_codes')
export class OAuthAuthorisationCodes implements AuthorizationCode {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('text')
  authorizationCode: string;

  @ManyToOne(() => OAuthClients, (client) => client.authorizationCodes)
  @JoinColumn({ name: 'clientId' })
  client: OAuthClients;

  @ManyToOne(() => Users, (user) => user.authorizationCodes)
  @JoinColumn({ name: 'userId' })
  user: Users;

  @Column('text')
  redirectUri: string;

  @Column('timestamp without time zone')
  expiresAt: Date;

  @Column('text', { array: true })
  scope: string[];

  @Column('text')
  codeChallenge?: string;

  @Column('text')
  codeChallengeMethod?: string;
}
