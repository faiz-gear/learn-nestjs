import {
  BadRequestException,
  Controller,
  Get,
  Headers,
  Inject,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import * as qrcode from 'qrcode';
import { users } from 'src/app.controller';
import { RedisService } from 'src/redis/redis.service';

// noscan 未扫描
// scan-wait-confirm -已扫描，等待用户确认
// scan-confirm 已扫描，用户同意授权
// scan-cancel 已扫描，用户取消授权
// expired 已过期
interface QrCodeInfo {
  status:
    | 'noscan'
    | 'scan-wait-confirm'
    | 'scan-confirm'
    | 'scan-cancel'
    | 'expired';
  userInfo?: {
    userId: number;
  };
}

@Controller('qrcode')
export class QrcodeController {
  @Inject(RedisService)
  private readonly redisService: RedisService;

  @Inject(JwtService)
  private readonly jwtService: JwtService;

  // 生成二维码
  @Get('/generate')
  async generate() {
    const uuid = randomUUID();

    const dataUrl = await qrcode.toDataURL(
      `http://192.168.1.36:3000/static/confirm.html?id=${uuid}`,
    );

    const qrcodeInfo: QrCodeInfo = {
      status: 'noscan',
    };
    const qrcodeField = `qrcode_${uuid}`;
    await this.redisService.set(qrcodeField, JSON.stringify(qrcodeInfo), 60);

    return {
      qrcode_id: uuid,
      dataUrl,
    };
  }

  // 通过id查询二维码信息
  @Get('check')
  async check(@Query('id') id: string) {
    const qrcodeField = `qrcode_${id}`;
    const qrcodeInfo = await this.redisService.get(qrcodeField);
    const parsedQrcodeInfo = JSON.parse(qrcodeInfo);
    console.log(
      '🚀 ~ file: qrcode.controller.ts ~ line 68 ~ QrcodeController ~ check ~ parsedQrcodeInfo',
      parsedQrcodeInfo,
    );
    return {
      token: await this.jwtService.sign({
        userId: parsedQrcodeInfo.userId,
      }),
      ...parsedQrcodeInfo,
    };
  }

  // 扫描二维码
  @Get('scan')
  async scan(@Query('id') id: string) {
    const qrcodeField = `qrcode_${id}`;
    const qrcodeInfo = await this.redisService.get(qrcodeField);
    console.log(
      '🚀 ~ file: qrcode.controller.ts ~ line 68 ~ QrcodeController ~ scan ~ qrcodeInfo',
      qrcodeInfo,
    );
    if (!qrcodeInfo) {
      throw new BadRequestException('二维码已过期');
    }
    const parsedQrcodeInfo = JSON.parse(qrcodeInfo);
    parsedQrcodeInfo.status = 'scan-wait-confirm';
    await this.redisService.set(qrcodeField, JSON.stringify(parsedQrcodeInfo));
    return 'success';
  }

  // 用户确认授权
  @Get('confirm')
  async confirm(
    @Query('id') id: string,
    @Headers('Authorization') auth: string,
  ) {
    // 获取用户信息
    let user;
    try {
      const [, token] = auth.split(' ');
      const info = await this.jwtService.verify(token);

      user = users.find((item) => item.id == info.userId);
    } catch (e) {
      throw new UnauthorizedException('token 过期，请重新登录');
    }

    const qrcodeField = `qrcode_${id}`;
    const qrcodeInfo = await this.redisService.get(qrcodeField);
    if (!qrcodeInfo) {
      throw new BadRequestException('二维码已过期');
    }
    const parsedQrcodeInfo = JSON.parse(qrcodeInfo);
    if (parsedQrcodeInfo.status !== 'scan-wait-confirm') {
      throw new BadRequestException('二维码状态错误');
    }
    parsedQrcodeInfo.status = 'scan-confirm';
    parsedQrcodeInfo.userInfo = {
      userId: user.id,
      username: user.username,
    };
    await this.redisService.set(qrcodeField, JSON.stringify(parsedQrcodeInfo));

    return 'success';
  }

  // 用户取消授权
  @Get('cancel')
  async cancel(@Query('id') id: string) {
    const qrcodeField = `qrcode_${id}`;
    const qrcodeInfo = await this.redisService.get(qrcodeField);
    if (!qrcodeInfo) {
      throw new BadRequestException('二维码已过期');
    }
    const parsedQrcodeInfo = JSON.parse(qrcodeInfo);
    if (parsedQrcodeInfo.status !== 'scan-wait-confirm') {
      throw new BadRequestException('二维码状态错误');
    }
    parsedQrcodeInfo.status = 'scan-cancel';
    await this.redisService.set(qrcodeField, JSON.stringify(parsedQrcodeInfo));
    return 'success';
  }
}
