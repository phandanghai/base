import {
  ApiResponse,
  CreateUserDto,
  CreateUserSchema,
  RABBIT_PATTERN,
  RabbitMQService,
  Timeout,
} from '@base/shared';
import { ZodValidationPipe } from '@base/shared';
import { Body, Controller, Post, Logger } from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';

@Controller('users')
export class UserCotroller {
  private readonly logger = new Logger(UserCotroller.name);

  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @Post('test')
  testRequest(@Body() body: unknown) {
    return {
      body,
    };
  }

  @Post('')
  @Timeout(10000)
  @ApiResponse(
    RABBIT_PATTERN.USER.CREATE_NEW_USER.description,
    StatusCodes.CREATED,
  )
  async createNewUserRequest(
    @Body(new ZodValidationPipe(CreateUserSchema)) createUserDto: CreateUserDto,
  ) {
    try {
      this.logger.log(`Creating user: ${createUserDto.email}`);

      const result = await this.rabbitMQService.send(
        RABBIT_PATTERN.USER.CREATE_NEW_USER.pattern,
        createUserDto,
      );

      this.logger.log(`User created successfully: ${createUserDto.email}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`, error.stack);
      throw error;
    }
  }
}
