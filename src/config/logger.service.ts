import * as winston from 'winston';

import { Global, Injectable } from '@nestjs/common';
import { utilities as winstonUtils } from 'nest-winston/dist/winston.utilities';
import { LogLevel } from 'src/common';

@Global()
@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;
  get consoleTransport(): any {
    return new winston.transports.Console({
      level: process.env.LOG_LEVEL || LogLevel.INFO,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        winstonUtils.format.nestLike(),
      ),
    });
  }

  constructor() {
    this.logger = winston.createLogger();

    this.logger.configure({
      transports: [this.consoleTransport],
      exitOnError: false,
    });
  }

  public log(message: string): void {
    this.logger.log({
      level: LogLevel.INFO,
      message: message,
    });
  }

  public debug(message: string, stackTrace?: any): void {
    this.logger.log({
      level: LogLevel.DEBUG,
      message: message,
      meta: { stackTrace: stackTrace },
    });
  }

  public error(message: string, stackTrace?: any): void {
    this.logger.log({
      level: LogLevel.ERROR,
      message: message,
      meta: { stackTrace: stackTrace },
    });
  }

  public warn(message: string): void {
    this.logger.log({
      level: LogLevel.WARN,
      message: message,
    });
  }

  public info(message: string): void {
    this.logger.log({
      level: LogLevel.INFO,
      message: message,
    });
  }
}
