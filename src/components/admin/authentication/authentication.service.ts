import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtOptionsFactory, JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ObjectId } from 'mongoose';
import { LoggerService } from 'src/config/logger.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly logger: LoggerService,
  ) {}

  async generateAccessToken(userId: ObjectId): Promise<string> {
    this.logger.info(`Generating encoded Token for user:${userId}`);

    const payload = {
      user: {
        id: userId,
      },
    };
    try {
      const encodedToken: string = await this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN,
      });
      return encodedToken;
    } catch (error) {
      this.logger.error(`Internal Server Error: ${error.message}`);
      throw new InternalServerErrorException();
    }
  }
}
