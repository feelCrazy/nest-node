import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from '../user/dto/user.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    console.log('>>>>>>>>username', username);

    const user = await this.usersService.findUser(username);
    if (!user) {
      throw new BadRequestException('user not found');
    }
    if (user.password !== password) {
      throw new BadRequestException('password is no valid');
    }

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(userDto: UserDTO) {
    const signUser = await this.usersService.create(userDto);
    if (signUser) {
      const user = await this.usersService.findUser(userDto.name);
      return await this.login({ username: user.name, password: user.password });
    } else {
      return '用户名已存在';
    }
  }
}
