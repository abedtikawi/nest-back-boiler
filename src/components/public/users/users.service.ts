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
        return new ReturnResponses().emitDBError(
          `This email:${email} already exists in DB.`,
        );
      }
    } catch (error) {
      return new ReturnResponses().emitInternalServerError();
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

  async signinUser(data): Promise<Responses> {
    const { email, password } = data;
    try {
      this.logger.info(`Attempting to find User:${email}`);
      const user = await this.usersModel.findOne({ email, isAvailable: true });
      if (!user) {
        this.logger.warn(`Email:${email} does not exist`);
        return new ReturnResponses().emitDBError(
          `Email:${email} does not exist`,
        );
      }
      this.logger.info(`Checking passwords`);
      const checkPassword: boolean = await bcrypt.compare(
        password,
        user.password,
      );
      if (!checkPassword) {
        this.logger.warn(`Wrong Password while logging in`);
        return new ReturnResponses().emitUnAuthorized('Wrong credentials');
      }

      const encodedToken = await this.authenticationService.generateAccessToken(
        user._id,
      );
      return new ReturnResponses().emitSuccess(encodedToken);
    } catch (error) {
      return new ReturnResponses().emitInternalServerError();
    }
  }
}
