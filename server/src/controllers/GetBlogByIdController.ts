import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { GetBlogByIdService } from '../services/GetBlogByIdService';

interface UserType{
  user: {
    _id: string;
    name: string;
  }
}

class GetBlogByIdController{
  async handle(req: Request & UserType, res: Response){
    const { blogId } = req.body
    const { search } = <{search: string}>req.query

    const service = new GetBlogByIdService()
  
    const result = await service.execute(blogId, search)

    return res.status(StatusCodes.OK).json(result)
  }
}

export { GetBlogByIdController }