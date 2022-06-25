import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { IUSER } from 'src/common/types/user.interface';
import { LoggerService } from 'src/config/logger.service';
import {
  ForbiddenException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Users, UsersDocument } from 'src/schemas/mongoDB/users.schema';
import { AuthenticationService } from '../authentication/authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @Inject(Users.name) private usersModel: Model<UsersDocument>,
    private readonly authenticationService: AuthenticationService,
    private readonly logger: LoggerService,
  ) {}

  async createUser(data: CreateUserDto): Promise<Users | HttpException> {
    try {
      const { email, password } = data;
      const user = await this.usersModel.findOne({ email });
      if (user) {
        this.logger.warn(`This email:${email} already exists in DB.`);
        throw new ForbiddenException();
      }
      const encryptedPassword = await bcrypt.hash(password, 10);
      const createUser = await this.usersModel.create({
        ...data,
        password: encryptedPassword,
      });
      return createUser;
    } catch (error) {
      this.logger.error(`Internal Server Error:${error.message}`);
      throw new InternalServerErrorException();
    }
  }
}
