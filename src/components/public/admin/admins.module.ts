import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/databases/mongoDB.module';
import { AuthenticationModule } from '../../admin/authentication/authentication.module';
import { LoggerService } from 'src/config/logger.service';
import { AdminsController } from './admins.controller.dto';
import { AdminsService } from './admins.service';
import { adminsProvider } from 'src/providers/mongoDB/admins.provider';

@Module({
  imports: [DatabaseModule, AuthenticationModule],
  controllers: [AdminsController],
  providers: [AdminsService, LoggerService, ...adminsProvider],
  exports: [AdminsService],
})
export class AdminsModule {}
