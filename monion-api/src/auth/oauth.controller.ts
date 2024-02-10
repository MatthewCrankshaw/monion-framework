// oauth2.controller.ts
import {
  Controller,
  Get,
  Post,
  Query,
  Request,
  Response,
} from '@nestjs/common';
import { OAuthClientCredentialsService } from './oauth-client-credentails.service';
import OAuth2Server = require('@node-oauth/oauth2-server');
import { OAuthAuthorizationCodeService } from './oauth-code-flow.service';

@Controller('oauth')
export class OauthController {
  constructor(
    protected clientCredentials: OAuthClientCredentialsService,
    protected authorizationCode: OAuthAuthorizationCodeService,
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
    res.json({
      code: code.authorizationCode,
    });
    // Validate the client_id, redirect_uri, and code_challenge from the query parameters
    // Generate an authorization code and associate it with the client_id and code_challenge
    // Redirect the user back to the redirect_uri with the authorization code
  }
}
