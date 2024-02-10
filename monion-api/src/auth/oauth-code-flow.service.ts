import { Injectable } from '@nestjs/common';
import OAuth2Server = require('@node-oauth/oauth2-server');

@Injectable()
export class OAuthAuthorizationCodeService {
  constructor(protected server: OAuth2Server) {}

  public async authorize(
    request: OAuth2Server.Request,
    response: OAuth2Server.Response,
    options?: OAuth2Server.AuthorizeOptions,
  ): Promise<OAuth2Server.AuthorizationCode> {
    const code = await this.server.authorize(request, response, options);
    return code;
  }
}
