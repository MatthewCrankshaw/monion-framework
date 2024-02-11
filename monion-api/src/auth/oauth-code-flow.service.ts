import {
  AuthorizationCode,
  AuthorizationCodeModel,
  Client,
  ClientCredentialsModel,
  Falsey,
  Token,
  User,
} from '@node-oauth/oauth2-server';
import { Injectable } from '@nestjs/common';
import { OAuthClients } from './oauth-clients.entity';
import { Repository } from 'typeorm';
import { OAuthTokens } from './oauth-tokens.entity';
import crypto = require('crypto');
import jwt = require('jsonwebtoken');
import fs = require('fs');

@Injectable()
export class OAuthCodeFlowModel
  implements AuthorizationCodeModel, ClientCredentialsModel
{
  constructor(
    protected clientRepository: Repository<OAuthClients>,
    protected tokenRepository: Repository<OAuthTokens>,
    protected authorizationCodeRepository: Repository<AuthorizationCode>,
  ) {}

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

  public saveAuthorizationCode(
    code: Pick<
      AuthorizationCode,
      | 'authorizationCode'
      | 'expiresAt'
      | 'redirectUri'
      | 'scope'
      | 'codeChallenge'
      | 'codeChallengeMethod'
    >,
    client: Client,
    user: User,
  ): Promise<Falsey | AuthorizationCode> {
    const authorizationCode = this.authorizationCodeRepository.create({
      authorizationCode: code.authorizationCode,
      redirectUri: code.redirectUri,
      expiresAt: code.expiresAt,
      scope: code.scope,
      client,
      user,
    });

    return this.authorizationCodeRepository.save(authorizationCode);
  }

  public validateScope(
    user: User,
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
   * Fetch the private key from the file system.
   *
   * @returns {string}
   */
  protected getKey(): string {
    return fs.readFileSync('res/development_private_key.pem', 'utf8');
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

  public getAccessToken(accessToken: string): Promise<Falsey | Token> {
    return this.tokenRepository.findOne({
      where: { accessToken },
      relations: ['user'],
    });
  }

  public verifyScope?(token: Token, scope: string[]): Promise<boolean> {
    throw new Error('verify scope Method not implemented.');
  }

  public generateRefreshToken?(
    client: Client,
    user: User,
    scope: string[],
  ): Promise<string> {
    throw new Error('generate refresh token Method not implemented.');
  }

  public validateRedirectUri(
    redirect_uri: string,
    client: Client,
  ): Promise<boolean> {
    return Promise.resolve(client.redirectUris.includes(redirect_uri));
  }

  public getAuthorizationCode(
    authorizationCode: string,
  ): Promise<Falsey | AuthorizationCode> {
    throw new Error('get authorization code Method not implemented.');
  }

  public revokeAuthorizationCode(code: AuthorizationCode): Promise<boolean> {
    throw new Error('revoke authorization code Method not implemented.');
  }
}
