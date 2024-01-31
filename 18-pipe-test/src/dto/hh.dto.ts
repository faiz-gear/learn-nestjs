import { IsInt } from 'class-validator';

export class Hhh {
  name: string;
  @IsInt()
  age: number;
  male: boolean;
  hobbies: string[];
}
