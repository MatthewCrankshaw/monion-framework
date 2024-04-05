/**
 * Registers a new user.
 *
 * @param user - The user object containing registration details.
 * @param res - The Express response object.
 *
 * @returns A Promise that resolves to the created user object.
 */
import { Controller, Post, Body, Res, Param, Get } from '@nestjs/common';
import { UserRegistrationService } from './user.registration.service';
import { Response } from 'express';
import { UserDto } from './user.dto';
import { HandlerService } from 'src/error/handler.service';
import { UserRetrievalService } from './user.retrieval.service';
import { buildResponse } from 'src/utilities/response/response.builder.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly usersService: UserRegistrationService,
    private readonly retrievalService: UserRetrievalService,
    private readonly handler: HandlerService,
  ) {}

  @Post('register')
  async registerUser(
    @Body() user: UserDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const createdUser = await this.usersService.registerUser(user);
      const responseData = this.makeResponse(createdUser);
      const data = buildResponse(responseData);
      res.json(data);
    } catch (error: unknown) {
      this.handler.handle(error, res);
    }
  }

  @Get(':id')
  async getUserById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const user = await this.retrievalService.getById(id);
      const responseData = this.makeResponse(user);
      const data = buildResponse(responseData);
      res.json(data);
    } catch (error: unknown) {
      this.handler.handle(error, res);
    }
  }

  protected makeResponse(user: UserDto): any {
    return {
      id: user.id,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      email: user.email,
    };
  }
}
