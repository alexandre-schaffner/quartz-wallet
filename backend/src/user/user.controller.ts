/*
| Developed by Quartz Wallet
| Filename : user.controller.ts
| Author : Alexandre Schaffner (alexandre.schaffner@icloud.com)
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { SignUpDto } from 'src/user/dto/SignUp.dto';
import { v4 as uuidv4 } from 'uuid';

import { AuthGuard } from './auth.guard';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { RemovePasswordInterceptor } from './remove-password.interceptor';
import { handleErrors } from 'src/errors/handleErrors';

/*
|--------------------------------------------------------------------------
| USER CONTROLLER
|--------------------------------------------------------------------------
*/

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /*
  |--------------------------------------------------------------------------
  | AUTHENTICATION
  |--------------------------------------------------------------------------
  */

  // Registration route
  //--------------------------------------------------------------------------
  @Post('auth/sign-up')
  async signup(@Body() body: SignUpDto, @Res() res: Response) {
    try {
      // Hash the password
      //--------------------------------------------------------------------------
      body.password = await bcrypt.hash(body.password, 10);

      // Create the user and remove the password from the response
      //--------------------------------------------------------------------------
      const newUser: Partial<User> = await this.userService.create(body);

      delete newUser.password;

      // Generate a JWT and add it to an httpOnly cookie
      //--------------------------------------------------------------------------
      const token = await this.jwtService.signAsync(
        {},
        { jwtid: uuidv4(), subject: newUser.id },
      );

      res.cookie('jwt', token, { httpOnly: true });

      // Return the user
      //--------------------------------------------------------------------------
      res.status(201).send({
        message: 'User successfully created',
        user: newUser,
      });
    } catch (err: unknown) {
      handleErrors(err);
    }
  }

  // Login route
  //--------------------------------------------------------------------------
  @HttpCode(200)
  @Post('auth/sign-in')
  async signIn(@Body() body: SignUpDto, @Res() res: Response) {
    try {
      // Login the user and remove the password from the response
      //--------------------------------------------------------------------------
      const user: Partial<User> = await this.userService.signIn(
        body.email,
        body.password,
      );

      delete user.password;

      // Generate a JWT and add it to an httpOnly cookie
      //--------------------------------------------------------------------------
      const token = await this.jwtService.signAsync(
        {},
        { jwtid: uuidv4(), subject: user.id },
      );

      res.cookie('jwt', token, { httpOnly: true });

      // Return the user
      //--------------------------------------------------------------------------
      res.status(200).send({
        message: 'User successfully logged in',
        user,
      });
    } catch (err: unknown) {
      handleErrors(err);
    }
  }

  // Token revokation / logout route
  //--------------------------------------------------------------------------
  @UseGuards(AuthGuard)
  @Delete('auth/revoke-token')
  async revokeToken(@Req() req: Request) {
    try {
      return {
        message: 'Token successfully revoked',
        jti: await this.userService.revokeToken(req.user.jti),
      };
    } catch (err: unknown) {
      handleErrors(err);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | GETTERS
  |--------------------------------------------------------------------------
  */

  // Get current user
  //--------------------------------------------------------------------------
  @UseGuards(AuthGuard)
  @UseInterceptors(RemovePasswordInterceptor)
  @Get('/me')
  async me(@Req() req: Request) {
    try {
      return {
        message: 'User found',
        user: await this.userService.findById(req.user.id),
      };
    } catch (err: unknown) {
      handleErrors(err);
    }
  }
}
