/**
 * Registers a new user.
 *
 * @param user - The user object containing registration details.
 * @param res - The Express response object.
 *
 * @returns A Promise that resolves to the created user object.
 */
import { Controller, Post, Body, Res } from '@nestjs/common';
import { UserRegistrationService } from './user.registration.service';
import { Response } from 'express';
import { UserDto } from './user.dto';
import { HandlerService } from 'src/error/handler.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly usersService: UserRegistrationService,
    private readonly handler: HandlerService,
  ) {}

  @Post('register')
  async registerUser(
    @Body() user: UserDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const createdUser = await this.usersService.registerUser(user);

      res.json({
        id: createdUser.id,
        createdAt: createdUser.createdAt,
        updatedAt: createdUser.updatedAt,
        username: createdUser.username,
      });
    } catch (error: unknown) {
      this.handler.handle(error, res);
    }
  }
}
