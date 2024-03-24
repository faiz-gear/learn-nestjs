import {
  Injectable,
  Logger,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RedisService } from 'src/redis/redis.service';
import { md5 } from 'src/utils';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginUserVo } from './vo/login-user.vo';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const generateUserVo = (user: User) => {
  const vo = new LoginUserVo();
  vo.userInfo = {
    id: user.id,
    username: user.username,
    nickName: user.nickName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    headPic: user.headPic,
    createTime: user.createTime.getTime(),
    isFrozen: user.isFrozen,
    isAdmin: user.isAdmin,
    roles: user.roles.map((item) => item.name),
    permissions: user.roles.reduce((arr, item) => {
      item.permissions.forEach((permission) => {
        if (arr.indexOf(permission) === -1) {
          arr.push(permission);
        }
      });
      return arr;
    }, []),
  };
  return vo;
};

@Injectable()
export class UserService {
  private logger = new Logger();

  @InjectRepository(User)
  private userRepository: Repository<User>;

  @InjectRepository(Role)
  private roleRepository: Repository<Role>;

  @InjectRepository(Permission)
  private permissionRepository: Repository<Permission>;

  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(JwtService)
  private jwtService: JwtService;

  @Inject(ConfigService)
  private configService: ConfigService;

  async register(registerUser: RegisterUserDto) {
    const { captcha, username, nickName, password, email } = registerUser;
    const captchaKey = `register_captcha_${email}`;
    const captchaValue = await this.redisService.get(captchaKey);

    if (!captchaValue) {
      throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
    }

    if (captcha !== captchaValue) {
      throw new HttpException('验证码错误', HttpStatus.BAD_REQUEST);
    }

    const foundUser = await this.userRepository.findOneBy({ username });

    if (foundUser) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }

    try {
      const user = new User();
      user.username = username;
      user.password = md5(password);
      user.nickName = nickName;
      user.email = email;
      await this.userRepository.save(user);
      return '注册成功';
    } catch (error) {
      this.logger.error(error, UserService);
      throw new HttpException('注册失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async initData() {
    const user1 = new User();
    user1.username = 'admin';
    user1.password = md5('123456');
    user1.email = 'xxx@xx.com';
    user1.isAdmin = true;
    user1.nickName = 'admin';
    user1.phoneNumber = '13233323333';

    const user2 = new User();
    user2.username = 'user1';
    user2.password = md5('123456');
    user2.email = 'yy@yy.com';
    user2.nickName = '李四';

    const role1 = new Role();
    role1.name = '管理员';

    const role2 = new Role();
    role2.name = '普通用户';

    const permission1 = new Permission();
    permission1.code = 'ccc';
    permission1.description = '访问 ccc 接口';

    const permission2 = new Permission();
    permission2.code = 'ddd';
    permission2.description = '访问 ddd 接口';

    user1.roles = [role1];
    user2.roles = [role2];

    role1.permissions = [permission1, permission2];
    role2.permissions = [permission1];

    await this.permissionRepository.save([permission1, permission2]);
    await this.roleRepository.save([role1, role2]);
    await this.userRepository.save([user1, user2]);
  }

  async login(loginUser: LoginUserDto, isAdmin: boolean) {
    const { username, password } = loginUser;
    const foundUser = await this.userRepository.findOne({
      where: {
        username,
        isAdmin,
      },
      relations: ['roles', 'roles.permissions'],
    });

    if (!foundUser) {
      throw new HttpException('用户不存在', HttpStatus.NOT_FOUND);
    }

    if (md5(password) !== foundUser.password) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }

    const vo = generateUserVo(foundUser);

    return vo;
  }

  async loginAndReturnToken(loginUser: LoginUserDto, isAdmin: boolean) {
    const vo = await this.login(loginUser, isAdmin);

    const accessToken = this.jwtService.sign(
      {
        userId: vo.userInfo.id,
        username: vo.userInfo.username,
        roles: vo.userInfo.roles,
        permissions: vo.userInfo.permissions,
        email: vo.userInfo.email,
      },
      {
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_TIME'),
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        userId: vo.userInfo.id,
      },
      {
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_TIME'),
      },
    );

    vo.accessToken = accessToken;
    vo.refreshToken = refreshToken;

    return vo;
  }

  async findUserById(id: number, isAdmin) {
    const foundUser = await this.userRepository.findOne({
      where: {
        id,
        isAdmin,
      },
      relations: ['roles', 'roles.permissions'],
    });

    const vo = generateUserVo(foundUser);

    return vo;
  }

  async refreshToken(refreshToken: string, isAdmin) {
    try {
      const data = await this.jwtService.verify(refreshToken);
      console.log(
        '🚀 ~ file: user.service.ts ~ line 181 ~ UserService ~ refreshToken ~ data',
        data,
      );
      const user = await this.findUserById(data.userId, isAdmin);
      const newAccessToken = this.jwtService.sign(
        {
          userId: user.userInfo.id,
          username: user.userInfo.username,
          roles: user.userInfo.roles,
          permissions: user.userInfo.permissions,
        },

        {
          expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_TIME'),
        },
      );

      const newRefreshToken = this.jwtService.sign(
        {
          userId: user.userInfo.id,
        },
        {
          expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_TIME'),
        },
      );

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (err) {
      throw new HttpException('refreshToken无效', HttpStatus.UNAUTHORIZED);
    }
  }

  async findUserDetailById(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });

    return user;
  }

  async updatePassword(userId: number, passwordDto: UpdateUserPasswordDto) {
    const { captcha, email, password } = passwordDto;
    const foundCaptcha = await this.redisService.get(
      `update_password_captcha_${email}`,
    );

    if (!foundCaptcha) {
      throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
    }

    if (captcha !== foundCaptcha) {
      throw new HttpException('验证码错误', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findOneBy({ id: userId });

    user.password = md5(password);

    try {
      await this.userRepository.save(user);
      await this.redisService.del(`update_password_captcha_${email}`);
      return '修改密码成功';
    } catch (err) {
      this.logger.error(err, UserService);
      throw new HttpException('修改密码失败', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    const { email, nickName, headPic, captcha } = updateUserDto;
    const foundCaptcha = await this.redisService.get(
      `update_user_captcha_${email}`,
    );

    if (!foundCaptcha) {
      throw new HttpException('验证码已失效', HttpStatus.BAD_REQUEST);
    }

    if (captcha !== foundCaptcha) {
      throw new HttpException('验证码错误', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findOneBy({
      id: userId,
    });

    if (nickName) {
      user.nickName = updateUserDto.nickName;
    }
    if (headPic) {
      user.headPic = updateUserDto.headPic;
    }

    try {
      await this.userRepository.save(user);
      return '用户信息修改成功';
    } catch (e) {
      this.logger.error(e, UserService);
      return '用户信息修改成功';
    }
  }
}
