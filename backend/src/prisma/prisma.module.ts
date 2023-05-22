/*
| Developed by Quartz Wallet
| Filename : prisma.module.ts
| Author : Alexandre Schaffner (alexandre.schaffner@icloud.com)
*/

import { Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';

/*
|--------------------------------------------------------------------------
| PRISMA MODULE
|--------------------------------------------------------------------------
*/

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
