import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class OAuthClients {
  @Column('text')
  @PrimaryColumn()
  client_id: string;

  @Column('text')
  @PrimaryColumn()
  client_secret: string;

  @Column('text')
  redirect_url: string;
}
