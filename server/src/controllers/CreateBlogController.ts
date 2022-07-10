import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { BadRequestError } from '../errors';
import { CreateBlogService } from '../services/CreateBlogService';

interface IUserRequest{
  user: {
    _id: string;
    name: string;
  }
}

class CreateBlogController{
  async handle(req: Request & IUserRequest, res: Response){
    req.body.createdBy = req.user._id
    const { name, createdBy } = req.body

    if(!name){
      throw new BadRequestError('Please provide name')
    }
    
    const service = new CreateBlogService()
    const result = await service.execute(name, createdBy)

    res.status(StatusCodes.CREATED).json(result)
  }
}

export { CreateBlogController }