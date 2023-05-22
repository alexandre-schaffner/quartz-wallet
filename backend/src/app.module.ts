/*
| Developed by Quartz Wallet
| Filename : app.module.ts
| Author : Alexandre Schaffner (alexandre.schaffner@icloud.com)
*/

import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

/*
|--------------------------------------------------------------------------
| APP MODULE
|--------------------------------------------------------------------------
*/

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
