import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OAuthTokens {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column('text')
  access_token: string;

  @Column({ type: 'timestamp without time zone' })
  access_token_expires_on: Date;

  @Column('text')
  client_id: string;

  @Column('text')
  refresh_token: string;

  @Column({ type: 'timestamp without time zone' })
  refresh_token_expires_on: Date;

  @Column('uuid')
  user_id: string;
}
