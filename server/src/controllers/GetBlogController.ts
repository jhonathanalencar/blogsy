import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { GetBlogService } from '../services/GetBlogService';

interface UserType{
  user: {
    _id: string;
    name: string;
  }
}

class GetBlogController{
  async handle(req: Request & UserType, res: Response){
    req.body.createdBy = req.user._id
    const { user } = req
    const service = new GetBlogService()
    const result = await service.execute(user?._id)

    return res.status(StatusCodes.OK).json(result)
  }
}

export { GetBlogController }