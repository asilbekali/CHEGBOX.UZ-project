import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { MailService } from 'src/mail/mail.service';
import { config } from 'process';
@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
      global: true,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, MailService],
})
export class UserModule {}
