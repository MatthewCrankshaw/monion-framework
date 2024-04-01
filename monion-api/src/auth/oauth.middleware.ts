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
   *
   * @param next - The next function to call in the middleware chain.
   */
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const request = new Oauth2Server.Request(req);
      const response = new Oauth2Server.Response(res);
      await this.oauthServer.authenticate(request, response);

      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
