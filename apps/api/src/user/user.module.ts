import { Module } from '@nestjs/common';
import { UserCotroller } from './user.controller';

@Module({
  imports: [],
  controllers: [UserCotroller],
  providers: [],
})
export class AppModule {}
