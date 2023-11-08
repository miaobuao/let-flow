import { IsEmail, Length, IsAlphanumeric, IsNotEmpty } from 'class-validator';

export class UserRegisterForm {
  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsAlphanumeric()
  @Length(1024, 1024)
  readonly password: string;

  readonly tel: number;
}

export class UserInfo {
  @IsAlphanumeric()
  readonly id: string;

  @IsNotEmpty()
  readonly username: string;
}
