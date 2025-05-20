import { IsString, IsNotEmpty } from 'class-validator';

export class AuthUserRequestBody {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}