import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { GetUserService } from '../services/GetUserService';

interface UserRequest{
   user: {
    _id: string;
    name: string;
  }
}

class GetUserController{
  async handle(req: Request & UserRequest, res: Response){

    const { _id } = req.user

    const service = new GetUserService()
    const result = await service.execute(_id)

    return res.status(StatusCodes.OK).json(result)
  }
}

export { GetUserController }