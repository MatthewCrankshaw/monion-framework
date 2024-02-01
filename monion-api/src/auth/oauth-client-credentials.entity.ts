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
import { Users } from 'src/users/users.entity';
import { OAuthTokens } from './oauth-tokens.entity';

@Injectable()
export class OAuthClientCredentialsModel implements ClientCredentialsModel {
  constructor(
    @InjectRepository(OAuthClients)
    private readonly clientRepository: Repository<OAuthClients>,
    @InjectRepository(OAuthTokens)
    private readonly tokenRepository: Repository<OAuthTokens>,
  ) {}

  public async getUserFromClient(client: OAuthClients): Promise<User | Falsey> {
    return client.user;
  }

  validateScope(
    user: Users,
    client: Client,
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
  ): Promise<Client | Falsey> {
    try {
      const client = await this.clientRepository.findOne({
        where: {
          clientId,
          clientSecret,
        },
      });

      return client || false;
    } catch (error) {
      console.error('Error fetching client:', error.message);
      throw error;
    }
  }

  public async saveToken(
    token: Token,
    client: Client,
    user: User,
  ): Promise<Token | Falsey> {
    try {
      const tokenEntity = this.tokenRepository.create({
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        accessTokenExpiresAt: token.accessTokenExpiresAt,
        refreshTokenExpiresAt: token.refreshTokenExpiresAt,
        client,
        user,
      });

      const savedToken = await this.tokenRepository.save(tokenEntity);
      return Promise.resolve(savedToken);
    } catch (error) {
      console.log('Error saving access token', error);
      return null;
    }
  }

  public async getAccessToken(accessToken: string): Promise<Token | Falsey> {
    return this.tokenRepository.findOne({ where: { accessToken } });
  }
}
