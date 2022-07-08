import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

export const errorHandlerMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  let customError = {
    // set default
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: error.message || 'Something went wrong try again later'
  }

  if(error.code && error.code === 11000){
    customError.msg = `Duplicate value entered for ${Object.keys(error.keyValue)} field, please choose another value`
    customError.statusCode = 400
  }

  return res.status(customError.statusCode).send({msg: customError.msg })
}