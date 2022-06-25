import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthenticationService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(userId: string) {
    return userId;
  }

  async findUser(userId: string) {
    return userId;
  }
}
