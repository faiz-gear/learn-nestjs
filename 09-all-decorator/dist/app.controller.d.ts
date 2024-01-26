import { CreateBbbDto } from './dto/create-bbb.dto';
export declare class AppController {
    constructor();
    private readonly appService;
    getHello(): string;
    bbb(id: number, bbbQuery: boolean): string;
    postBbb(body: CreateBbbDto): CreateBbbDto;
    ccc(header: Record<string, any>, accept: string): Record<string, any>;
    ip(ip: string): string;
    session(session: any): any;
    user(): {
        name: string;
        age: number;
    };
}
