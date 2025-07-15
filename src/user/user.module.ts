import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { MailService } from 'src/mail/mail.service';
@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: 'ustatop',
      signOptions: { expiresIn: '1h' },
      global: true,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, MailService],
})
export class UserModule {}
