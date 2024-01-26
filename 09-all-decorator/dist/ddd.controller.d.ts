import { NextFunction, Request, Response } from 'express';
export declare class DddController {
    hello(host: any): any;
    ccc(req: Request): string;
    eee(res: Response): string;
    fff(next: NextFunction): string;
    fff2(): string;
    ggg(): string;
    hhh(): string;
    iii(): {
        url: string;
        statusCode: number;
    };
}
