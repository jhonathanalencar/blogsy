import { StatusCodes } from "http-status-codes";
import { CustomError } from "./customError";

class UnauthenticatedError extends CustomError{
  statusCode: number

  constructor(message: string){
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

export { UnauthenticatedError }