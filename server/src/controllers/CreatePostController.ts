import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { CreatePostService } from '../services/CreatePostService';

interface IUserRequest{
  user: {
    _id: string;
    name: string;
  }
}

class CreatePostController{
  async handle(req: Request & IUserRequest, res: Response){
    req.body.userId = req.user._id

    const { title, text, userId } = req.body

    const service = new CreatePostService()
    const result = await service.execute(title, text, userId)

    res.status(StatusCodes.CREATED).json(result)
  }
}

export { CreatePostController }