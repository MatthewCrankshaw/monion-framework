// oauth2.controller.ts
import { Controller, Get, Post, Request, Response } from '@nestjs/common';
import OAuth2Server = require('@node-oauth/oauth2-server');

@Controller('oauth')
export class OauthController {
  constructor(
    protected clientCredentials: OAuth2Server,
    protected authorizationCode: OAuth2Server,
  ) {}

  @Post('token')
  public async token(@Request() req: any, @Response() res: any) {
    const oauthRequest = new OAuth2Server.Request(req);
    const oauthResponse = new OAuth2Server.Response(res);

    const grantType = oauthRequest.body.grant_type;

    if (grantType === 'authorization_code') {
    } else if (grantType === 'client_credentials') {
      const token = await this.clientCredentials.token(
        oauthRequest,
        oauthResponse,
      );

      delete token.client;
      delete token.user;

      res.json({
        accessToken: token.accessToken,
        accessTokenExpiresAt: token.accessTokenExpiresAt,
      });
    }
  }

  @Get('authorize')
  public async authorize(@Request() req: any, @Response() res: any) {
    const oauthRequest = new OAuth2Server.Request(req);
    const oauthResponse = new OAuth2Server.Response(res);

    const code = await this.authorizationCode.authorize(
      oauthRequest,
      oauthResponse,
    );

    // Redirect with the code
    res.json({
      redirectUri: code.redirectUri,
      code: code.authorizationCode,
      test: code.expiresAt,
    });
  }
}
