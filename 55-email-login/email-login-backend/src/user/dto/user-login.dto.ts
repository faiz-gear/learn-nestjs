import { IsEmail, IsNotEmpty, Length } from 'class-validator';
export class UserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6)
  code: string;
}
