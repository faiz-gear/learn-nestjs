import {
  Contains,
  IsEmail,
  IsFQDN,
  IsInt,
  IsDateString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class Iii {
  @Length(10, 20)
  title: string;

  @Contains('hello')
  text: string;

  @IsInt()
  @Min(0)
  @Max(10)
  rating: number;

  @IsEmail()
  email: string;

  @IsFQDN()
  site: string;

  @IsDateString()
  createDate: string;
}
