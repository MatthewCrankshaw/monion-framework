import { InjectRepository } from '@nestjs/typeorm';
import {
  ClientCredentialsModel,
  Falsey,
  Token,
  User,
} from '@node-oauth/oauth2-server';
import { OAuthClients } from './oauth-clients.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Users } from 'src/users/users.entity';

@Injectable()
export class OAuthClientCredentialsModel implements ClientCredentialsModel {
  constructor(
    @InjectRepository(OAuthClients)
    private readonly clientRepository: Repository<OAuthClients>,
  ) {}

  public async getUserFromClient(client: OAuthClients): Promise<User | Falsey> {
    return client.user;
  }

  validateScope(
    user: Users,
    client: OAuthClients,
    scope?: string[],
  ): Promise<string[] | Falsey> {
    const clientScopes = client.scopes;

    const validScopes = scope.every((value) => clientScopes.includes(value));
    if (validScopes) {
      return Promise.resolve(scope);
    } else {
      return null;
    }
  }

  public async getClient(
    clientId: string,
    clientSecret: string,
  ): Promise<OAuthClients | Falsey> {
    try {
      const client = await this.clientRepository.findOne({
        where: {
          client_id: clientId,
          client_secret: clientSecret,
        },
      });

      return client || false;
    } catch (error) {
      console.error('Error fetching client:', error.message);
      throw error;
    }
  }
  saveToken(
    token: Token,
    client: OAuthClients,
    user: User,
  ): Promise<Token | Falsey> {
    console.log(token);
    throw new Error('saveToken not implemented.');
  }
  getAccessToken(accessToken: string): Promise<Token | Falsey> {
    throw new Error('getAccessToken not implemented.');
  }
  verifyScope?(token: Token, scope: string[]): Promise<boolean> {
    throw new Error('verifyScope not implemented.');
  }
}
