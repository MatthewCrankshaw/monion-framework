import {
  AuthorizationCode,
  Client,
  ClientCredentialsModel,
  Falsey,
  PasswordModel,
  RefreshToken,
  RefreshTokenModel,
  Token,
  User,
} from '@node-oauth/oauth2-server';
import { Injectable } from '@nestjs/common';
import { OAuthClientEntity } from './oauth-client.entity';
import { Repository } from 'typeorm';
import { OAuthTokenEntity } from './oauth-token.entity';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as bcrypt from 'bcryptjs';
import { ACCESS_TOKEN_LIFETIME_SECONDS } from './oauth-lifetime.constants';

/**
 * Service for handling OAuth authentication and authorization.
 */
@Injectable()
export class OAuthService
  implements ClientCredentialsModel, PasswordModel, RefreshTokenModel
{
  constructor(
    protected clientRepository: Repository<OAuthClientEntity>,
    protected tokenRepository: Repository<OAuthTokenEntity>,
    protected authorizationCodeRepository: Repository<AuthorizationCode>,
    protected userRepository: Repository<User>,
  ) {}

  /**
   * Get a refresh token by the provided refresh token string.
   *
   * @param {string} refreshToken
   *
   * @returns {Promise<RefreshToken | Falsey>}
   */
  public async getRefreshToken(
    refreshToken: string,
  ): Promise<RefreshToken | Falsey> {
    const token = await this.tokenRepository.findOne({
      where: { refreshToken },
      relations: ['user', 'client'],
    });
    return token || false;
  }

  public async revokeToken(token: RefreshToken): Promise<boolean> {
    // TODO Revoke the token by setting it as revoked instead of deleting it
    const deletedToken = await this.tokenRepository.delete({
      refreshToken: token.refreshToken,
    });
    return deletedToken.affected > 0;
  }

  public async getUser(
    username: string,
    password: string,
    _client: Client,
  ): Promise<User | Falsey> {
    const user = await this.userRepository.findOne({
      where: {
        email: username,
      },
    });

    if (!user) {
      return false;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return false;
    }

    return user;
  }

  public getUserFromClient(client: Client): Promise<User | Falsey> {
    return client.user;
  }

  public generateAuthorizationCode(
    client: Client,
    user: User,
    scope: string[],
  ): Promise<string> {
    const authorizationCode = crypto.randomBytes(32).toString('hex');
    return Promise.resolve(authorizationCode);
  }

  public validateScope(
    user: User,
    client: Client,
    scope?: string[],
  ): Promise<string[] | Falsey> {
    if (scope === undefined) {
      return Promise.resolve([]);
    }

    const clientScope = client.scope;

    const validScope = scope.every((value) => clientScope.includes(value));
    if (validScope) {
      return Promise.resolve(scope);
    } else {
      return null;
    }
  }

  public generateAccessToken(
    client: Client,
    user: User,
    scope: string[] | undefined,
  ): Promise<string> {
    let scopes = '';
    if (scope && scope.length > 0) {
      scopes = scope.join(' ');
    }

    const payload = {
      sub: user.id,
      iss: 'monion',
      aud: client.clientId,
      scope: scopes,
      exp: Date.now() + ACCESS_TOKEN_LIFETIME_SECONDS * 1000,
    };

    const secretKey = this.getKey();
    return jwt.sign(payload, secretKey, { algorithm: 'ES384' });
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
  ): Promise<Falsey | Token> {
    try {
      const tokenEntity = this.createTokenEntity(token, client, user);
      const savedToken = await this.tokenRepository.save(tokenEntity);
      return Promise.resolve(savedToken);
    } catch (error) {
      console.log('Error saving access token', error);
      return null;
    }
  }

  public getAccessToken(accessToken: string): Promise<Falsey | Token> {
    const token = this.tokenRepository.findOne({
      where: { accessToken },
      relations: ['user'],
    });
    return token;
  }

  public async generateRefreshToken(
    client: Client,
    user: User,
    scope: string[],
  ): Promise<string> {
    const refreshToken = crypto.randomBytes(32).toString('hex');
    return Promise.resolve(refreshToken);
  }

  /**
   * Fetch the private key from the file system.
   *
   * @returns {string}
   */
  protected getKey(): string {
    return fs.readFileSync('res/development_private_key.pem', 'utf8');
  }

  /**
   * Create a token entity based on the provided token, client, and user.
   *
   * @param {Token} token
   * @param {Client} client
   * @param {User} user
   *
   * @returns {OAuthTokenEntity}
   */
  protected createTokenEntity(
    token: Token,
    client: Client,
    user: User,
  ): OAuthTokenEntity {
    return this.tokenRepository.create({
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      scope: token.scope,
      client,
      user,
    });
  }
}
