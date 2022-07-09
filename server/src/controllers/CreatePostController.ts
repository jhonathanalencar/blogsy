import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { CreatePostService } from '../services/CreatePostService';

interface IUserRequest{
  user: {
    userId: string;
    name: string;
  }
}

interface IRequestBody{
  title: string;
  text: string;
  createdBy: string;
}

class CreatePostController{
  async handle(req: Request & IUserRequest, res: Response){
    req.body.createdBy = req.user.userId

    const { title, text, createdBy } = <IRequestBody>req.body

    const service = new CreatePostService()
    const result = await service.execute(title, text, createdBy)

    res.status(StatusCodes.CREATED).json(result)
  }
}

export { CreatePostController }