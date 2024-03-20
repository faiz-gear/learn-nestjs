import { Controller, Post, Body, Get, Query, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { RedisService } from 'src/redis/redis.service';
import { EmailService } from 'src/email/email.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(EmailService)
  private emailService: EmailService;

  @Post('register')
  async register(@Body() registerUser: RegisterUserDto) {
    return await this.userService.register(registerUser);
  }

  @Get('register-captcha')
  async getRegisterCaptcha(@Query('email') email: string) {
    const code = Math.random().toString(36).slice(-6);

    await this.redisService.set(`captcha_${email}`, code, 60 * 5);

    await this.emailService.sendMail({
      to: email,
      subject: '注册验证码',
      html: `<h1>您的注册验证码是${code}</h1>`,
    });

    return '验证码已发送';
  }
}
