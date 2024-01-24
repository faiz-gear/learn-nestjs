import { AaaService } from './aaa.service';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
export declare class AaaController {
    private readonly aaaService;
    constructor(aaaService: AaaService);
    create(createAaaDto: CreateAaaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAaaDto: UpdateAaaDto): string;
    remove(id: string): string;
}
