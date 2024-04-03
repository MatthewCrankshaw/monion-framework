import { Injectable } from '@nestjs/common';
import * as OAuth2Server from '@node-oauth/oauth2-server';
import { Response } from 'express';

@Injectable()
export class OAuthHandlerService {
  public handle(error: Error | unknown, res: Response) {
    if (
      error instanceof OAuth2Server.OAuthError &&
      error.code >= 400 &&
      error.code < 500
    ) {
      res.status(error.code).json({
        message: error.message,
      });
    } else if (error instanceof Error) {
      // TODO if in a development environment then return the error in the response otherwise mask the error message
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  }
}
