// oauth2.controller.ts
import { Controller, Post, Request, Response } from '@nestjs/common';
import { OAuthClientCredentialsService } from './oauth-client-credentails.service';
import OAuth2Server = require('@node-oauth/oauth2-server');

@Controller('oauth')
export class OauthController {
  constructor(protected clientCredentials: OAuthClientCredentialsService) {}

  @Post('token')
  public async token(@Request() req: any, @Response() res: any) {
    const oauthRequest = new OAuth2Server.Request(req);
    const oauthResponse = new OAuth2Server.Response(res);

    const token = await this.clientCredentials.token(
      oauthRequest,
      oauthResponse,
    );

    res.json(token);
  }
}
