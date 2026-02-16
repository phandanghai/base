import { UserCotroller } from './user/user.controller';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMQModule } from '@base/shared';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    RabbitMQModule,
  ],
  controllers: [AppController, UserCotroller],
  providers: [AppService],
})
export class AppModule {}
