// user.entity.ts
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

@Entity({ name: 'users' })
export class Users implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  username: string;

  @Column({ type: 'text', nullable: true })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OAuthClients, (client) => client.user)
  clients: OAuthClients[];

  @OneToMany(() => OAuthTokens, (token) => token.user)
  tokens: OAuthTokens[];

  @OneToMany(() => OAuthAuthorisationCodes, (code) => code.user)
  authorizationCodes: OAuthAuthorisationCodes[];
}
