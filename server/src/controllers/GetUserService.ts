import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { GetUserService } from '../services/GetUserService';

interface UserRequest{
   user: {
    userId: string;
    name: string;
  }
}

class GetUserController{
  async handle(req: Request & UserRequest, res: Response){

    const { userId } = req.user

    const service = new GetUserService()
    const result = await service.execute(userId)

    return res.status(StatusCodes.OK).json(result)
  }
}

export { GetUserController }