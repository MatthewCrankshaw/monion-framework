import { Injectable } from '@nestjs/common';
import OAuth2Server = require('@node-oauth/oauth2-server');

@Injectable()
export class OAuthClientCredentialsService {
  constructor(protected server: OAuth2Server) {}

  public async token(
    request: OAuth2Server.Request,
    response: OAuth2Server.Response,
    options?: OAuth2Server.TokenOptions,
  ): Promise<OAuth2Server.Token> {
    const token = await this.server.token(request, response, options);
    delete token.client;
    delete token.user;
    return token;
  }
}
