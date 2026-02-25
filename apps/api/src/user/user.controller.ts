import {
  ApiResponse,
  CreateUserDto,
  CreateUserSchema,
  RABBIT_PATTERN,
  RabbitMQService,
  Timeout,
  UserQuerySchema,
  UserQueryDto,
} from '@base/shared';
import { ZodValidationPipe } from '@base/shared';
import { Body, Controller, Post, Logger, Get, Query } from '@nestjs/common';
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
    this.logger.log(`Creating user: ${createUserDto.email}`);

    return await this.rabbitMQService.send(
      RABBIT_PATTERN.USER.CREATE_NEW_USER.pattern,
      createUserDto,
    );
  }

  @Get('')
  @Timeout(10000)
  @ApiResponse(RABBIT_PATTERN.USER.GET_ALL_USERS.description, StatusCodes.OK)
  async getAllUserRequest(
    @Query(new ZodValidationPipe(UserQuerySchema)) query: UserQueryDto,
  ) {
    this.logger.log('Get all users by filter...');
    this.logger.debug(`Query params: ${JSON.stringify(query)}`);

    return this.rabbitMQService.send(
      RABBIT_PATTERN.USER.GET_ALL_USERS.pattern,
      query,
    );
  }
}
