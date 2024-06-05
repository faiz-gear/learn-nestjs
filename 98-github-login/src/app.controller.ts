import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('auth/github')
  @UseGuards(AuthGuard('github'))
  async githubLogin() {
    return;
  }

  @Get('auth/github/callback')
  @UseGuards(AuthGuard('github'))
  async githubLoginCallback(@Request() req: any) {
    return req.user;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
