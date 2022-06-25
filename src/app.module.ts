import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './components/admin/users/users.module';
import { AuthenticationModule } from './components/admin/authentication/authentication.module';

@Module({
  imports: [UsersModule, AuthenticationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
