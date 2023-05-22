/*
| Developed by Quartz Wallet
| Filename : handlePrismaErrors.ts
| Author : Alexandre Schaffner (alexandre.schaffner@icloud.com)
*/

import {
  ConflictException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AxiosError } from 'axios';

/*
|--------------------------------------------------------------------------
| WRAPPER TO HANDLE ERRORS
|--------------------------------------------------------------------------
*/

export function handleErrors(err: unknown) {
  if (err instanceof UnauthorizedException) throw err;

  // If the call to the Starton API fails, throw the HttpException
  //--------------------------------------------------------------------------
  if (err instanceof AxiosError) {
    throw new HttpException(err.response?.data, Number(err.response?.status));
  }

  // Handle Prisma errors
  //--------------------------------------------------------------------------
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    handlePrismaErrors(err);
  }

  // If the error is not handled, log it and throw a 500 Internal Server Error
  //--------------------------------------------------------------------------
  console.error(err);
  throw new InternalServerErrorException();
}

/*
|--------------------------------------------------------------------------
| WRAPPER TO HANDLE PRISMA ERRORS
|--------------------------------------------------------------------------
*/

function handlePrismaErrors(err: unknown) {
  if (!(err instanceof Prisma.PrismaClientKnownRequestError)) return;

  switch (err.code) {
    // 404 Not Found
    //--------------------------------------------------------------------------
    case 'P2025':
      throw new NotFoundException();

    // 409 Conflict
    //--------------------------------------------------------------------------
    case 'P2002':
      throw new ConflictException();

    default:
      break;
  }

  // 500 Internal Server Error  + logging if not handled
  //--------------------------------------------------------------------------
  console.error(err);
  throw new InternalServerErrorException();
}
