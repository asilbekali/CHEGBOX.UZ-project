import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MulterModule } from './multe-r/multer.module';
import { RegionModule } from './region/region.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    MulterModule,
    RegionModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
