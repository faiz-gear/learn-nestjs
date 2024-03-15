import { Controller, Get, Inject, Query } from '@nestjs/common';
import { EmailService } from './email.service';
import { RedisService } from 'src/redis/redis.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Inject(RedisService)
  private readonly redisService: RedisService;

  @Get('code')
  async sendEmailCode(@Query('address') address) {
    const code = Math.random().toString(16).slice(2, 8).toUpperCase();

    await this.redisService.set(`captcha:${address}`, code, 60 * 5);

    await this.emailService.sendMail({
      to: address,
      subject: '登录验证码',
      html: '<p>您的验证码是：</p><h1>' + code + '</h1>',
    });

    return '发送成功';
  }
}
