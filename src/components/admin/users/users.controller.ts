import { UsersService } from './users.service';
import { IUSER } from 'src/common/types/user.interface';
import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from 'src/schemas/mongoDB/users.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async createUser(
    @Body() data: CreateUserDto,
  ): Promise<Users | HttpException> {
    return await this.usersService.createUser(data);
  }
}
