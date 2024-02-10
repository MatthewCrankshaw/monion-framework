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
import jwt = require('jsonwebtoken');
import fs = require('fs');

/**
 * The OAuthClientCredentialsModel class is a custom implementation of the ClientCredentialsModel
 * interface. It is used to validate the client credentials and generate access tokens for the client.
 */
@Injectable()
export class OAuthClientCredentialsModel implements ClientCredentialsModel {
  constructor(
    private readonly clientRepository: Repository<OAuthClients>,
    private readonly tokenRepository: Repository<OAuthTokens>,
  ) {}

  /**
   * Get the associated user for the given client.
   *
   * @param {OAuthClients} client
   *
   * @returns {Promise<User | Falsey>}
   */
  public async getUserFromClient(client: OAuthClients): Promise<User | Falsey> {
    return client.user;
  }

  /**
   * Validate that the client is able to request the given scope.
   *
   * @param {Users} user
   * @param {Client} client
   * @param {Scope} scope
   * @returns {Promise<string[] | Falsey>}
   */
  public validateScope(
    user: Users,
    client: Client,
    scope?: string[],
  ): Promise<string[] | Falsey> {
    if (scope === undefined) {
      return Promise.resolve([]);
    }
    const clientScopes = client.scopes;

    const validScopes = scope.every((value) => clientScopes.includes(value));
    if (validScopes) {
      return Promise.resolve(scope);
    } else {
      return null;
    }
  }

  /**
   * Get the client using the requested client id and client secret.
   *
   * @param {string} clientId
   * @param {string} clientSecret
   *
   * @returns {Promise<Client | Falsey>}
   */
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

  /**
   * Generate a JWT access token for the given client and user.
   * The token is signed using the ES384 algorithm and the private key
   *
   * @param {Client} client
   * @param {User} user
   * @param {string[]} scope
   *
   * @returns {Promise<string>}
   */
  public generateAccessToken?(
    client: Client,
    user: User,
    scope: string[],
  ): Promise<string> {
    const secretKey = this.getKey();

    const payload = {
      sub: user.id,
      iss: 'monion',
      aud: client.clientId,
      scope: scope.join(' '),
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };

    return jwt.sign(payload, secretKey, { algorithm: 'ES384' });
  }

  /**
   * Save the access token for the given client and user.
   *
   * @param {Token} token
   * @param {Client} client
   * @param {User} user
   * @returns {Promise<Token | Falsey>}
   */

  /**
   * Save the access token for the given client and user.
   *
   * @param {Token} token
   * @param {Client} client
   * @param {User} user
   *
   * @returns {Promise<Token | Falsey>}
   */
  public async saveToken(
    token: Token,
    client: Client,
    user: User,
  ): Promise<Token | Falsey> {
    try {
      const tokenEntity = this.createTokenEntity(token, client, user);
      const savedToken = await this.tokenRepository.save(tokenEntity);
      return Promise.resolve(savedToken);
    } catch (error) {
      console.log('Error saving access token', error);
      return null;
    }
  }

  /**
   * Create a token entity based on the provided token, client, and user.
   *
   * @param {Token} token
   * @param {Client} client
   * @param {User} user
   *
   * @returns {OAuthTokens}
   */
  private createTokenEntity(
    token: Token,
    client: Client,
    user: User,
  ): OAuthTokens {
    return this.tokenRepository.create({
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      client,
      user,
    });
  }

  /**
   * Get the access token record from the database.
   *
   * @param {string} accessToken
   *
   * @returns
   */
  public async getAccessToken(accessToken: string): Promise<Token | Falsey> {
    return this.tokenRepository.findOne({ where: { accessToken } });
  }

  /**
   * Fetch the private key from the file system.
   *
   * @returns {string}
   */
  protected getKey(): string {
    return fs.readFileSync('res/development_private_key.pem', 'utf8');
  }
}
