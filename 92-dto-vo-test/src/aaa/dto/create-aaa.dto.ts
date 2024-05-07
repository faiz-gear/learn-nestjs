import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAaaDto {
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsBoolean()
  sex: boolean;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  hobbies: string[];
}
