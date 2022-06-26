import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './components/public/users/users.module';
import { AuthenticationModule } from './components/admin/authentication/authentication.module';
import { AdminsModule } from './components/public/admin/admins.module';

@Module({
  imports: [UsersModule, AdminsModule, AuthenticationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
