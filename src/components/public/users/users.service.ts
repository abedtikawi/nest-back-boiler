import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { LoggerService } from 'src/config/logger.service';
import {
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Users, UsersDocument } from 'src/schemas/mongoDB/users.schema';
import { AuthenticationService } from '../../admin/authentication/authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JWTEncodedToken } from 'src/common/types/token.interface';
import { Responses, ReturnResponses } from 'src/common/types/Responses';
@Injectable()
export class UsersService {
  constructor(
    @Inject(Users.name) private usersModel: Model<UsersDocument>,
    private readonly authenticationService: AuthenticationService,
    private readonly logger: LoggerService,
  ) {}

  async createUser(data: CreateUserDto): Promise<Responses> {
    const { email, password } = data;
    try {
      this.logger.info(`Fetching User with email:${email}`);
      const user: Users = await this.usersModel.findOne({ email });

      if (user) {
        this.logger.warn(`This email:${email} already exists in DB.`);
        throw new Error();
      }
    } catch (error) {
      return new ReturnResponses().emitDBError(
        `This email:${email} already exists in DB.`,
      );
    }

    try {
      this.logger.info(`Encrypting password`);
      const encryptedPassword: string = await bcrypt.hash(password, 10);

      this.logger.info(`Creating User`);
      const createUser: Users = await this.usersModel.create({
        ...data,
        password: encryptedPassword,
      });

      this.logger.info(`User:${email} is successfully created .`);
      const encodedToken: string =
        await this.authenticationService.generateAccessToken(createUser._id);
      return new ReturnResponses().emitSuccess(encodedToken);
    } catch (error) {
      this.logger.error(`Internal Server Error:${error.message}`);
      return new ReturnResponses().emitInternalServerError();
    }
  }

  async signinUser(data): Promise<JWTEncodedToken | HttpException> {
    const { email, password } = data;
    try {
      this.logger.info(`Attempting to find User:${email}`);
      const user = await this.usersModel.findOne({ email });
      if (!user) {
        this.logger.warn(`Email:${email} does not exist`);
        throw new Error();
      }
      return;
    } catch (error) {
      return new HttpException(`Email:${email} does not exist`, 400);
    }
  }
}
