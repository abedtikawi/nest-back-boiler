import { Body, Controller, Post, Res } from '@nestjs/common';
import { Responses } from 'src/common/types/Responses';
import { Response } from 'express';
import { CreateAdminDto } from './dto/create-admin.dto';
import { AdminsService } from './admins.service';
import { SignInAdminDto } from './dto/signin-user.dto';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post('/signup')
  async createUser(
    @Body() data: CreateAdminDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Responses> {
    const result = await this.adminsService.createAdmin(data);
    response.status(result.errorCode).send(result);
    return;
  }

  @Post('/signin')
  async signinUser(
    @Body() data: SignInAdminDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Responses> {
    const result = await this.adminsService.signinAdmin(data);
    response.status(result.errorCode).send(result);
    return;
  }
}
