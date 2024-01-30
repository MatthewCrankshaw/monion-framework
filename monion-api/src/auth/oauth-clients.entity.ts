import { Users } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('oauth_clients')
export class OAuthClients {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  client_id: string;

  @Column('text')
  client_secret: string;

  @Column('text')
  redirect_url: string;

  @Column('text')
  grants: string;

  @ManyToOne(() => Users, (user) => user.clients, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
