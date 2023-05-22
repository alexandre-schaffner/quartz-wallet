/*
| Developed by Quartz Wallet
| Filename : user.module.ts
| Author : Alexandre Schaffner (alexandre.schaffner@icloud.com)
*/

import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

import { UserController } from './user.controller';
import { UserService } from './user.service';

/*
|--------------------------------------------------------------------------
| USER MODULE
|--------------------------------------------------------------------------
*/

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
