/*
| Developed by Quartz Wallet
| Filename : user.service.ts
| Author : Alexandre Schaffner (alexandre.schaffner@icloud.com)
*/

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Prisma, RevokedToken, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

/*
|--------------------------------------------------------------------------
| USER SERVICES
|--------------------------------------------------------------------------
*/

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  /*
  |--------------------------------------------------------------------------
  | AUTH RELATED SERVICES
  |--------------------------------------------------------------------------
  */

  // Sign in a user
  //--------------------------------------------------------------------------
  async signIn(email: string, password: string): Promise<User> {
    // Check if the user exists
    //--------------------------------------------------------------------------
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: { email },
    });

    // Check if the password is correct
    //--------------------------------------------------------------------------
    if (await bcrypt.compare(password, user.password)) return user;
    throw new UnauthorizedException();
  }

  // Revoke a token (logout)
  //--------------------------------------------------------------------------
  async revokeToken(jti: string): Promise<RevokedToken> {
    // Add the token to the revoked tokens list
    //--------------------------------------------------------------------------
    return await this.prismaService.revokedToken.create({
      data: { jti },
    });
  }

  /*
  |--------------------------------------------------------------------------
  | CRUD SERVICES
  |--------------------------------------------------------------------------
  */

  // Create a new user (registration)
  //--------------------------------------------------------------------------
  async create(user: Prisma.UserCreateInput): Promise<User> {
    return await this.prismaService.user.create({ data: user });
  }

  // Find a user by its id
  //--------------------------------------------------------------------------
  async findById(id: string): Promise<User> {
    return await this.prismaService.user.findUniqueOrThrow({ where: { id } });
  }
}
