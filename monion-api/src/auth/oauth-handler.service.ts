import { Injectable } from '@nestjs/common';
import * as OAuth2Server from '@node-oauth/oauth2-server';
import { Response } from 'express';
import { buildResponse } from 'src/utilities/response/response.builder.service';

@Injectable()
export class OAuthHandlerService {
  public handle(error: Error | unknown, res: Response) {
    if (
      error instanceof OAuth2Server.OAuthError &&
      error.code >= 400 &&
      error.code < 500
    ) {
      const data = buildResponse({
        message: error.message,
      });
      res.status(error.code).json(data);
    } else if (error instanceof Error) {
      // TODO if in a development environment then return the error in the response otherwise mask the error message
      const data = buildResponse({
        message: 'Internal Server Error',
      });
      res.status(500).json(data);
    }
  }
}
