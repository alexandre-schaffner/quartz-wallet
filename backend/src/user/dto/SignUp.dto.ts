/*
| Developed by Quartz Wallet
| Filename : SignUp.dto.ts
| Author : Alexandre Schaffner (alexandre.schaffner@icloud.com)
*/

import { IsEmail, IsStrongPassword } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
