import { InjectRepository } from '@nestjs/typeorm';
import {
  Client,
  ClientCredentialsModel,
  Falsey,
  Token,
  User,
} from '@node-oauth/oauth2-server';
import { OAuthClients } from './oauth-clients.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OAuthClientCredentialsModel implements ClientCredentialsModel {
  constructor(
    @InjectRepository(OAuthClients)
    private readonly clientRepository: Repository<OAuthClients>,
  ) {}

  getUserFromClient(client: Client): Promise<User | Falsey> {
    throw new Error('getUserFromClient not implemented.');
  }
  validateScope?(
    user: User,
    client: Client,
    scope?: string[],
  ): Promise<string[] | Falsey> {
    throw new Error('validateScope not implemented.');
  }
  generateAccessToken?(
    client: Client,
    user: User,
    scope: string[],
  ): Promise<string> {
    throw new Error('generateAccessToken not implemented.');
  }

  public async getClient(
    clientId: string,
    clientSecret: string,
  ): Promise<Client | Falsey> {
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
  saveToken(token: Token, client: Client, user: User): Promise<Token | Falsey> {
    throw new Error('saveToken not implemented.');
  }
  getAccessToken(accessToken: string): Promise<Token | Falsey> {
    throw new Error('getAccessToken not implemented.');
  }
  verifyScope?(token: Token, scope: string[]): Promise<boolean> {
    throw new Error('verifyScope not implemented.');
  }
}
