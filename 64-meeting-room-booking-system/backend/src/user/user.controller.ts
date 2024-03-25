import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Inject,
  HttpException,
  HttpStatus,
  DefaultValuePipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { RedisService } from 'src/redis/redis.service';
import { EmailService } from 'src/email/email.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RequireLogin, UserInfo } from 'src/custom.decorator';
import { UserInfoVo } from './vo/user-info.vo';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { generateParseIntPipe } from 'src/utils';

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

  async getCaptcha(
    prefix: string,
    email: string,
    captchaName: string,
    ttl?: number,
  ) {
    const code = Math.random().toString(36).slice(-6);

    await this.redisService.set(`${prefix}_${email}`, code, ttl ?? 60 * 5);

    await this.emailService.sendMail({
      to: email,
      subject: captchaName,
      html: `<h1>您的${captchaName}是${code}</h1>`,
    });

    return '验证码已发送';
  }

  @Get('register-captcha')
  async getRegisterCaptcha(@Query('email') email: string) {
    // const code = Math.random().toString(36).slice(-6);

    // await this.redisService.set(`captcha_${email}`, code, 60 * 5);

    // await this.emailService.sendMail({
    //   to: email,
    //   subject: '注册验证码',
    //   html: `<h1>您的注册验证码是${code}</h1>`,
    // });

    // return '验证码已发送';

    return await this.getCaptcha('register_captcha', email, '注册验证码');
  }

  @Get('init-data')
  async initData() {
    await this.userService.initData();
    return 'done';
  }

  @Post('login')
  async userLogin(@Body() loginUser: LoginUserDto) {
    return await this.userService.loginAndReturnToken(loginUser, false);
  }

  @Post('admin/login')
  async adminLogin(@Body() loginUser: LoginUserDto) {
    return await this.userService.loginAndReturnToken(loginUser, true);
  }

  @Get('refresh-token')
  async userRefreshToken(@Query('refreshToken') refreshToken: string) {
    return await this.userService.refreshToken(refreshToken, false);
  }

  @Get('admin/refresh-token')
  async adminRefreshToken(@Query('refreshToken') refreshToken: string) {
    return await this.userService.refreshToken(refreshToken, true);
  }

  @Get('info')
  @RequireLogin()
  async userInfo(@UserInfo('userId') userId: number) {
    const user = await this.userService.findUserDetailById(userId);
    const vo = new UserInfoVo();
    vo.id = user.id;
    vo.email = user.email;
    vo.username = user.username;
    vo.headPic = user.headPic;
    vo.phoneNumber = user.phoneNumber;
    vo.nickName = user.nickName;
    vo.createTime = user.createTime;
    vo.isFrozen = user.isFrozen;
    return vo;
  }

  @Post(['update-password', 'admin/update-password'])
  @RequireLogin()
  async updatePassword(
    @UserInfo('userId') userId: number,
    @Body() passwordDto: UpdateUserPasswordDto,
  ) {
    return await this.userService.updatePassword(userId, passwordDto);
  }

  @Get('update-password-captcha')
  @RequireLogin()
  async getUpdatePasswordCaptcha(
    @Query('email') email: string,
    @UserInfo('email') userInfoEmail: string,
  ) {
    if (email !== userInfoEmail)
      throw new HttpException(
        '接收验证码邮箱与用户绑定的邮箱信息不一致',
        HttpStatus.BAD_REQUEST,
      );

    // const code = Math.random().toString(36).slice(-6);

    // await this.redisService.set(
    //   `update_password_captcha_${email}`,
    //   code,
    //   60 * 5,
    // );

    // await this.emailService.sendMail({
    //   to: email,
    //   subject: '修改密码验证码',
    //   html: `<h1>您的修改密码验证码是${code}</h1>`,
    // });

    // return '验证码已发送';

    return await this.getCaptcha(
      'update_password_captcha',
      email,
      '修改密码验证码',
    );
  }

  @Post(['update-user', 'admin/update-user'])
  @RequireLogin()
  async updateUser(
    @UserInfo('userId') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(userId, updateUserDto);
  }

  @Get('update-user-captcha')
  @RequireLogin()
  async getUpdateUserCaptcha(
    @Query('email') email: string,
    @UserInfo('email') userInfoEmail: string,
  ) {
    if (email !== userInfoEmail)
      throw new HttpException(
        '接收验证码邮箱与用户绑定的邮箱信息不一致',
        HttpStatus.BAD_REQUEST,
      );

    return await this.getCaptcha(
      'update_user_captcha',
      email,
      '修改用户信息验证码',
    );
  }

  @Get('freeze-user')
  async freeze(@Query('id') userId: number) {
    await this.userService.freezeUserById(userId);
    return 'success';
  }

  @Get('list')
  async list(
    @Query('pageNo', new DefaultValuePipe(1), generateParseIntPipe('pageNo'))
    pageNo: number,
    @Query(
      'pageSize',
      new DefaultValuePipe(2),
      generateParseIntPipe('pageSize'),
    )
    pageSize: number,
    @Query('username') username: string,
    @Query('nickName') nickName: string,
    @Query('email') email: string,
  ) {
    return await this.userService.findUsersByPage(
      pageNo,
      pageSize,
      username,
      nickName,
      email,
    );
  }
}
