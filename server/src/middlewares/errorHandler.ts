import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

interface message{
  name: {
    name: string;
    message: string;
  }
}

export const errorHandlerMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  let customError = {
    // set default
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: error.message || 'Something went wrong try again later'
  }

  if(error.name === 'ValidationError'){
    customError.msg = error.errors['name'].message
    customError.statusCode = 400
  }

  if(error.code && error.code === 11000){
    customError.msg = `Duplicate value entered for ${Object.keys(error.keyValue)}, please choose another value`
    customError.statusCode = 400
  }

  return res.status(customError.statusCode).send({msg: customError.msg })
  // return res.status(customError.statusCode).send({msg: error })
}