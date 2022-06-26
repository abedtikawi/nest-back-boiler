export enum ResponseCodes {
  unAuthorized = 401,
  wrongInputs = 400,
  dbError = 403,
  success = 200,
  internalServerError = 500,
}
export enum ResponseStatus {
  unAuthorized = 'error',
  wrongInputs = 'error',
  dbError = 'error',
  success = 'success',
  internalServerError = 'Internal Server Error',
}
export enum ResponseMessage {
  unAuthorized = 'UNAUTHORIZED',
  wrongInputs = 'WRONG_INPUTS',
  success = 'success',
  internalServerError = 'Internal Server Error',
}

export class ReturnResponses {
  errorCode: number;
  status: string;
  message: string;
  data?: any;

  emitSuccess(data: any): Responses {
    return {
      errorCode: ResponseCodes.success,
      status: ResponseStatus.success,
      message: ResponseMessage.success,
      data: data,
    };
  }
  emitInternalServerError(): Responses {
    return {
      errorCode: ResponseCodes.internalServerError,
      status: ResponseStatus.internalServerError,
      message: ResponseMessage.internalServerError,
      data: null,
    };
  }
  emitUnAuthorized(data: any): Responses {
    return {
      errorCode: ResponseCodes.unAuthorized,
      status: ResponseStatus.unAuthorized,
      message: ResponseMessage.unAuthorized,
      data: data,
    };
  }
  emitWrongInputs(data: any): Responses {
    return {
      errorCode: ResponseCodes.wrongInputs,
      status: ResponseStatus.wrongInputs,
      message: ResponseMessage.wrongInputs,
      data: data,
    };
  }
  emitDBError(message: string): Responses {
    return {
      errorCode: ResponseCodes.dbError,
      status: ResponseStatus.dbError,
      message: message,
      data: null,
    };
  }
}
export interface Responses {
  errorCode: number;
  status: string;
  message: string;
  data?: any;
}
