import { Controller, Post, Body, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { Response } from 'express';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async registerUser(@Body() user: Users, @Res() res: Response): Promise<any> {
    const createdUser = await this.usersService.registerUser(user);

    res.json({
      id: createdUser.id,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
      username: createdUser.username,
    });
  }
}
