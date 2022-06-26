import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/databases/mongoDB.module';
import { usersProviders } from 'src/providers/mongoDB/users.provider';
import { AuthenticationModule } from '../../admin/authentication/authentication.module';
import { LoggerService } from 'src/config/logger.service';

@Module({
  imports: [DatabaseModule, AuthenticationModule],
  controllers: [UsersController],
  providers: [UsersService, LoggerService, ...usersProviders],
  exports: [UsersService],
})
export class UsersModule {}
