import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  HttpStatus,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';

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

  @UseGuards(LocalAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get('findActive')
  async findActive(@Req() req) {
    console.log('>>>req', req.user);
    return await this.userService.findActive();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id) {
    return await this.userService.findOne(id);
  }

  @Get('findUser')
  async findUser(@Body() body: { name: string }) {
    const { name } = body;
    return await this.userService.findUser(name);
  }
}
