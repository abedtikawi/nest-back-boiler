import { UsersService } from './users.service';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Responses } from 'src/common/types/Responses';
import { Response } from 'express';
import { SignInDto } from './dto/signin-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(
    @Body() data: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Responses> {
    const result = await this.usersService.createUser(data);
    response.status(result.errorCode).send(result);
    return;
  }

  @Post('/signin')
  async signinUser(
    @Body() data: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Responses> {
    const result = await this.usersService.signinUser(data);
    response.status(result.errorCode).send(result);
    return;
  }
}
