import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  HttpStatus,
  Param,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';

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

  @Get('remove')
  async removeOne(@Req() req: Request) {
    const id = req.query.id as string;
    return await this.userService.removeOne(id);
  }

  @Get('findActive')
  async findActive() {
    return await this.userService.findActive();
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    return await this.userService.findOne(id);
  }
}
