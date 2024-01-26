import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getHello2(): string;
    getHello3(ccc: string, accept: string, myAccept: string, aaa: string, bbb: number, myAaa: string, myBbb: boolean): string;
}
