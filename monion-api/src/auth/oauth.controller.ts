// oauth2.controller.ts
import { Controller, Get, Post, Request, Response } from '@nestjs/common';
import OAuth2Server = require('@node-oauth/oauth2-server');

@Controller('oauth')
export class OauthController {
  constructor(protected authorizationCode: OAuth2Server) {}

  @Post('token')
  public async token(@Request() req: any, @Response() res: any) {
    const oauthRequest = new OAuth2Server.Request(req);
    const oauthResponse = new OAuth2Server.Response(res);

    const token = await this.authorizationCode.token(
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

  @Get('authorize')
  public async authorize(@Request() req: any, @Response() res: any) {
    const oauthRequest = new OAuth2Server.Request(req);
    const oauthResponse = new OAuth2Server.Response(res);

    const code = await this.authorizationCode.authorize(
      oauthRequest,
      oauthResponse,
    );

    const redirectUrl = code.redirectUri;

    // Send a redirect response to send the user to the redirect URI with the authorization code
    res.redirect(303, redirectUrl + `?code=${code.authorizationCode}`);
  }
}
