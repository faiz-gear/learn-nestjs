import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 12)
  password: string;
}
