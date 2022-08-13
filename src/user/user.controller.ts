import { Controller, Get, Post, Res, Body, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getAllUser')
  async findAll(@Res() res: Response): Promise<any> {
    const data = await this.userService.finAll();
    return res.status(HttpStatus.OK).json({
      message: 'User Updated successfully!',
      data: data,
      status: 200,
    });
  }

  @Post('create')
  async create(@Res() res: Response, @Body() user: UserDTO): Promise<any> {
    await this.userService.create(user);
    return res.status(HttpStatus.OK).json({
      message: 'User Updated successfully!',
      status: 200,
    });
  }
}
