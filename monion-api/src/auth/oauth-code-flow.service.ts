import {
  AuthorizationCode,
  AuthorizationCodeModel,
  Client,
  Falsey,
  Token,
  User,
} from '@node-oauth/oauth2-server';
import { Injectable } from '@nestjs/common';
import { OAuthClients } from './oauth-clients.entity';
import { Repository } from 'typeorm';
import { OAuthTokens } from './oauth-tokens.entity';
import crypto = require('crypto');

@Injectable()
export class OAuthCodeFlowModel implements AuthorizationCodeModel {
  constructor(
    protected clientRepository: Repository<OAuthClients>,
    protected tokenRepository: Repository<OAuthTokens>,
    protected authorizationCodeRepository: Repository<AuthorizationCode>,
  ) {}

  generateRefreshToken?(
    client: Client,
    user: User,
    scope: string[],
  ): Promise<string> {
    throw new Error('generate refresh token Method not implemented.');
  }

  generateAuthorizationCode(
    client: Client,
    user: User,
    scope: string[],
  ): Promise<string> {
    const authorizationCode = crypto.randomBytes(32).toString('hex');
    return Promise.resolve(authorizationCode);
  }

  getAuthorizationCode(
    authorizationCode: string,
  ): Promise<Falsey | AuthorizationCode> {
    throw new Error('get authorization code Method not implemented.');
  }

  saveAuthorizationCode(
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

  revokeAuthorizationCode(code: AuthorizationCode): Promise<boolean> {
    throw new Error('revoke authorization code Method not implemented.');
  }

  validateScope(
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

  validateRedirectUri?(redirect_uri: string, client: Client): Promise<boolean> {
    throw new Error('validate redirect URI Method not implemented.');
  }

  generateAccessToken?(
    client: Client,
    user: User,
    scope: string[],
  ): Promise<string> {
    throw new Error('generate access token Method not implemented.');
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

  saveToken(token: Token, client: Client, user: User): Promise<Falsey | Token> {
    throw new Error('save token Method not implemented.');
  }

  getAccessToken(accessToken: string): Promise<Falsey | Token> {
    return this.tokenRepository.findOne({
      where: { accessToken },
      relations: ['user'],
    });
  }

  verifyScope?(token: Token, scope: string[]): Promise<boolean> {
    throw new Error('verify scope Method not implemented.');
  }
}
