import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Post,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  findAll(@Session() session: Record<string, any>) {
    session.visits = session.visits ? session.visits + 1 : 1;
    return `Visited ${session.visits} times`;
  }

  @Post('sign')
  sign(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    const newToken = this.jwtService.sign({ username, password });

    return {
      token: newToken,
    };
  }

  @Get('verify')
  verify(@Headers('authorization') auth: string) {
    try {
      const token = auth.split(' ')[1];
      const data = this.jwtService.verify(token);
      return data;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
  }
}
