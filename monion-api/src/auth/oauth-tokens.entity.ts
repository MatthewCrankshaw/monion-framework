import { Client, Token } from '@node-oauth/oauth2-server';
import { Users } from 'src/users/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OAuthClients } from './oauth-clients.entity';

@Entity('oauth_tokens')
export class OAuthTokens implements Token {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('text')
  accessToken: string;

  @Column('timestamp without time zone')
  accessTokenExpiresAt: Date;

  @Column('text')
  refreshToken: string;

  @Column('timestamp without time zone')
  refreshTokenExpiresAt: Date;

  @ManyToOne(() => OAuthClients, (client) => client.tokens)
  @JoinColumn({ name: 'clientId' })
  client: Client;

  @ManyToOne(() => Users, (user) => user.tokens)
  @JoinColumn({ name: 'userId' })
  user: Users;
}
