import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { LoginDto } from './dto/login.dto';

const md5 = (str: string) => {
  const md5 = crypto.createHash('md5');
  return md5.update(str).digest('hex');
};

@Injectable()
export class UserService {
  private logger = new Logger();

  @InjectRepository(User)
  private userRepository: Repository<User>;

  async create(createUserDto: CreateUserDto) {
    const foundUser = await this.userRepository.findOneBy({
      username: createUserDto.username,
    });
    if (foundUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    }

    const newUser = new User();
    newUser.username = createUserDto.username;
    newUser.password = md5(createUserDto.password);

    try {
      await this.userRepository.save(newUser);
      return '注册成功';
    } catch (e) {
      this.logger.error(e, UserService);
      return '注册失败';
    }
  }

  async login(loginDto: LoginDto) {
    const foundUser = await this.userRepository.findOne({
      where: {
        username: loginDto.username,
      },
    });

    if (!foundUser) {
      throw new HttpException('用户名不存在', HttpStatus.BAD_REQUEST);
    }
    if (foundUser.password !== md5(loginDto.password)) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }

    return foundUser;
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
