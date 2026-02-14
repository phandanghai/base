import { testDto, testSchema } from '@base/shared';
import { ZodValidationPipe } from '@base/shared';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UserCotroller {
  constructor() {}

  @Post('test')
  testRequest(@Body() body: unknown) {
    return {
      body,
    };
  }
}
