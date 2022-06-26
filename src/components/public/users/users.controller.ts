import { UsersService } from './users.service';
import { Body, Controller, HttpException, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from 'src/schemas/mongoDB/users.schema';
import { JWTEncodedToken } from 'src/common/types/token.interface';
import { Responses } from 'src/common/types/Responses';
import { Response } from 'express';

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
  async signinUser(@Body() data): Promise<JWTEncodedToken | HttpException> {
    return await this.usersService.signinUser(data);
  }
}
