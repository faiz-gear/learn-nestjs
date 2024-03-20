import { IsEmail, IsNotEmpty, Length } from 'class-validator';
export class RegisterUserDto {
  @IsNotEmpty({
    message: '用户不能为空',
  })
  username: string;

  @IsNotEmpty({
    message: '昵称不能为空',
  })
  nickName: string;

  @IsNotEmpty({
    message: '密码不能为空',
  })
  @Length(6, 20, {
    message: '密码长度为6-20',
  })
  password: string;

  @IsNotEmpty({
    message: '邮箱不能为空',
  })
  @IsEmail(
    {},
    {
      message: '邮箱格式不正确',
    },
  )
  email: string;

  @IsNotEmpty({
    message: '验证码不能为空',
  })
  captcha: string;
}
