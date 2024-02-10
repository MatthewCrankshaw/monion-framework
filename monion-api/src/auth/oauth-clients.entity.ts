import { Client } from '@node-oauth/oauth2-server';
import { Users } from 'src/users/users.entity';
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
import { OAuthTokens } from './oauth-tokens.entity';
import { OAuthAuthorisationCodes } from './oauth-authorisation-codes.entity';

@Entity('oauth_clients')
export class OAuthClients implements Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('text')
  clientId: string;

  @Column('text')
  clientSecret: string;

  @Column('text', { name: 'redirectUri' })
  redirectUris: string;

  @Column('text', { array: true })
  grants: string[];

  @Column('text', { array: true })
  scopes: string[];

  @ManyToOne(() => Users, (user) => user.clients, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: Users;

  @OneToMany(() => OAuthTokens, (token) => token.client)
  tokens: OAuthTokens[];

  @OneToMany(() => OAuthAuthorisationCodes, (code) => code.client)
  authorizationCodes: OAuthAuthorisationCodes[];
}
