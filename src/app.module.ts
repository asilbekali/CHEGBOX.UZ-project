import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MulterModule } from './multe-r/multer.module';

@Module({
  imports: [UserModule, MulterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
