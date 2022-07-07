import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

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
    throw new Error('No token provided')
  }

  const [, token] = authHeader.split(' ')

  try{
    const payload = verify(token, process.env.JWT_SECRET) as IPayload

    req.user = { userId: payload.userId, name: payload.name }
    return next()
  }catch(error){
    throw new Error('Not authorized to access this route')
  }
}

export { authenticationMiddleware }