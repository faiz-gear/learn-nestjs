import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
export declare class AaaService {
    create(createAaaDto: CreateAaaDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAaaDto: UpdateAaaDto): string;
    remove(id: number): string;
}
