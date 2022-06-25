import { Module } from '@nestjs/common';
import { databaseProviders } from './mongoDB.provider';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
