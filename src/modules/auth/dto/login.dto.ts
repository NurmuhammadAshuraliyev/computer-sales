import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  username: string;

  @IsString()
  @MaxLength(50)
  @MinLength(5)
  password: string;
}
