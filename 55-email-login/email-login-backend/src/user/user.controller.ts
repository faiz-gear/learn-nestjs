import {
  Controller,
  Post,
  Body,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserLoginDto } from './dto/user-login.dto';
import { RedisService } from 'src/redis/redis.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(RedisService)
  private readonly redisService: RedisService;

  @Post('login')
  async login(@Body() loginUserDto: UserLoginDto) {
    console.log(loginUserDto);
    const { email, code } = loginUserDto;
    const codeInRedis = await this.redisService.get(`captcha:${email}`);

    if (!codeInRedis) {
      throw new UnauthorizedException('验证码已过期');
    }

    if (codeInRedis !== code) {
      throw new UnauthorizedException('验证码错误');
    }

    const user = await this.userService.findOneByEmail(email);

    console.log(user);

    return 'success';
  }
}
