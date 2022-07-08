import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { UnauthenticatedError } from '../errors';

interface IPayload{
  userId: string;
  name: string;
}

interface IUserRequest{
  user: {
    userId: string;
    name: string;
  }
}

const authenticationMiddleware = async(req: Request & IUserRequest, res: Response, next: NextFunction) =>{
  const authHeader = req.headers.authorization

  if(!authHeader || !authHeader.startsWith('Bearer ')){
    throw new UnauthenticatedError('No token provided')
  }

  const [, token] = authHeader.split(' ')

  try{
    const payload = verify(token, process.env.JWT_SECRET) as IPayload

    req.user = { userId: payload.userId, name: payload.name }
    next()
  }catch(error){
    throw new UnauthenticatedError('Not authorized to access this route')
  }
}

export { authenticationMiddleware }