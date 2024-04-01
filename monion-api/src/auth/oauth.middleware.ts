import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as Oauth2Server from '@node-oauth/oauth2-server';

/**
 * Middleware for OAuth authentication.
 * This middleware is used to ensure that requests are authenticated using OAuth.
 */
@Injectable()
export class OAuthMiddleware implements NestMiddleware {
  /**
   * Creates an instance of OAuthMiddleware.
   *
   * @param oauthServer - The OAuth2 server instance.
   */
  constructor(private readonly oauthServer: Oauth2Server) {}

  /**
   * Handles the middleware logic.
   *
   * @param req - The Express request object.
   * @param res - The Express response object.
   * @param next - The next function to call in the middleware chain.
   */
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const request = new Oauth2Server.Request(req);
      const response = new Oauth2Server.Response(res);
      await this.oauthServer.authenticate(request, response);

      next();
    } catch (error) {
      if (error instanceof Oauth2Server.OAuthError) {
        if (error.code >= 400 && error.code < 500) {
          res.status(error.code).json({ message: error.message });
          return;
        }

        res.status(500).json({ message: 'Internal server error' });
        console.log(error);
        return;
      }

      res.status(500).json({ message: 'Internal server error' });
      console.log(error);
    }
  }
}
