import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsString({ each: true })
  hobbies: string[];
}
