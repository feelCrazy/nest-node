import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('loginAdmin')
  async findOne(@Body() parma: any, @Res() res: Response) {
    const user = await this.adminService.findOne(parma);
    return res.status(HttpStatus.OK).json({
      message: 'User Updated successfully!',
      data: user,
      status: 200,
    });
  }
}
