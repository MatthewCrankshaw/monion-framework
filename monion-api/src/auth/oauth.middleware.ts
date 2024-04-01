import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as Oauth2Server from '@node-oauth/oauth2-server';

@Injectable()
export class OAuthMiddleware implements NestMiddleware {
  constructor(private readonly oauthServer: Oauth2Server) {}

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
