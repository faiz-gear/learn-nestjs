import { Injectable } from '@nestjs/common';

const users = [];

@Injectable()
export class AppService {
  findUserByGithubId(githubId: string) {
    return users.find((user) => user.githubId === githubId);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
