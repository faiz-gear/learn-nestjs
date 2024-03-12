import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { LoginUserDto } from './dto/user-login.dto';
import { User } from './entities/user.entity';
import { EntityManager } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private readonly entityManager: EntityManager;

  async createUser(userDto: CreateUserDto) {
    const user = this.entityManager.create(User, userDto);
    await this.entityManager.save(user);
    return 'create user success';
  }

  async login(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    const user = await this.entityManager.findOne(User, {
      where: {
        username,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.OK);
    }

    if (password !== user.password) {
      throw new HttpException('Invalid credentials', HttpStatus.OK);
    }

    return user;
  }

  async findUserById(id: User['id']) {
    return this.entityManager.findOneBy(User, { id });
  }
}
