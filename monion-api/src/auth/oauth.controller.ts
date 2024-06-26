// oauth2.controller.ts
import { Controller, Get, Post, Request, Response } from '@nestjs/common';
import OAuth2Server = require('@node-oauth/oauth2-server');
import { OAuthHandlerService } from './oauth-handler.service';
import { buildResponse } from 'src/utilities/response/response.builder.service';

@Controller('oauth')
export class OauthController {
  constructor(
    protected authorizationCode: OAuth2Server,
    private readonly handler: OAuthHandlerService,
  ) {}

  @Post('token')
  public async token(@Request() req: any, @Response() res: any) {
    const oauthRequest = new OAuth2Server.Request(req);
    const oauthResponse = new OAuth2Server.Response(res);

    try {
      const token = await this.authorizationCode.token(
        oauthRequest,
        oauthResponse,
      );

      const grantType = oauthRequest.body.grant_type;

      if (grantType === 'client_credentials') {
        const data = buildResponse({
          accessToken: token.accessToken,
          accessTokenExpiresAt: token.accessTokenExpiresAt,
        });
        res.status(200).json(data);
      } else {
        const data = buildResponse({
          accessToken: token.accessToken,
          accessTokenExpiresAt: token.accessTokenExpiresAt.toISOString(),
          refreshToken: token.refreshToken,
          refreshTokenExpiresAt: token.refreshTokenExpiresAt.toISOString(),
        });

        res.status(200).json(data);
      }
    } catch (error: Error | unknown) {
      console.log(error);
      this.handler.handle(error, res);
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

    const redirectUrl = code.redirectUri;

    // Send a redirect response to send the user to the redirect URI with the authorization code
    res.redirect(303, redirectUrl + `?code=${code.authorizationCode}`);
  }
}
