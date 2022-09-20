import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Res() res: Response, @Body() user: UserDTO): Promise<any> {
    const use = await this.userService.create(user);
    if (use) {
      return res.status(HttpStatus.OK).json({
        message: '添加成功!',
        status: 200,
      });
    } else {
      return res.status(HttpStatus.OK).json({
        message: '用户名已存在!',
        status: 400,
      });
    }
  }

  @Get('remove')
  async removeOne(@Req() req: Request) {
    const id = req.query.id as string;
    return await this.userService.removeOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('findActive')
  async findActive(
    @Body()
    params: {
      name?: string;
      isAdmin?: boolean;
      page: {
        pageNum?: number;
        pageSize?: number;
      };
    },

    @Req() req,
  ) {
    const { page, ...res } = params;
    return await this.userService.findActive(res, page);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  async update(@Req() req, @Body() user) {
    const { id } = req.user;
    return await this.userService.update(user, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getUser')
  async getUser(@Req() req) {
    const { id } = req.user;
    return await this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('updatePassword')
  async updatePassword(@Req() req, @Body() data, @Res() res: Response) {
    const { id } = req.user;
    const user = await this.userService.updatePassword(id, data);
    if (user) {
      return res.status(HttpStatus.OK).json({
        message: user,
        data: data,
        status: 200,
      });
    } else {
      return res.status(HttpStatus.OK).json({
        message: '旧密码错误',
        data: data,
        status: 400,
      });
    }
  }
}
