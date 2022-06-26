import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { LoggerService } from 'src/config/logger.service';
import { Inject, Injectable } from '@nestjs/common';
import { AuthenticationService } from '../../admin/authentication/authentication.service';
import { Admins, AdminsDocument } from 'src/schemas/mongoDB/admins.schema';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Responses, ReturnResponses } from 'src/common/types/Responses';
import { SignInAdminDto } from './dto/signin-user.dto';
@Injectable()
export class AdminsService {
  constructor(
    @Inject(Admins.name) private AdminsModel: Model<AdminsDocument>,
    private readonly authenticationService: AuthenticationService,
    private readonly logger: LoggerService,
  ) {}

  async createAdmin(data: CreateAdminDto): Promise<Responses> {
    try {
      const { email, password } = data;
      this.logger.info(`Checking if email:${email} exists`);
      const admin: Admins = await this.AdminsModel.findOne({
        email,
        isAvailable: true,
      });
      if (admin) {
        this.logger.warn(`Admin with email:${email} already exists`);
        return new ReturnResponses().emitDBError(
          `Admin with email:${email} already exists`,
        );
      }
      this.logger.info(`Encrypting Password`);
      const encryptPassword: string = await bcrypt.hash(password, 10);
      const createAdmin: Admins = await this.AdminsModel.create({
        ...data,
        password: encryptPassword,
      });
      this.logger.info(`Successfully created admin`);
      const encodedToken: string =
        await this.authenticationService.generateAccessToken(createAdmin._id);
      return new ReturnResponses().emitSuccess(encodedToken);
    } catch (error) {
      this.logger.error(`Internal Server Error:${error.message}`);
      return new ReturnResponses().emitInternalServerError();
    }
  }

  async signinAdmin(data: SignInAdminDto): Promise<Responses> {
    try {
      const { email, password } = data;
      this.logger.info(`Checking if email:${email} exists`);
      const admin: Admins = await this.AdminsModel.findOne({
        email,
        isAvailable: true,
      });
      if (!admin) {
        this.logger.warn(`Email:${email} does not exist`);
        return new ReturnResponses().emitDBError(
          `Email:${email} does not exist`,
        );
      }
      this.logger.info(`Comparing Passwords`);
      const comparePasswords: boolean = await bcrypt.compare(
        password,
        admin.password,
      );

      if (!comparePasswords) {
        this.logger.warn(`Passwords do not match`);
        return new ReturnResponses().emitDBError(`Wrong credentials`);
      }
      const encodedToken: string =
        await this.authenticationService.generateAccessToken(admin._id);

      return new ReturnResponses().emitSuccess(encodedToken);
    } catch (error) {
      this.logger.error(`Internal Server Error:${error.message}`);
      return new ReturnResponses().emitInternalServerError();
    }
  }
}
