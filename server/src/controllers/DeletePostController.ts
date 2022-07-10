import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { DeletePostService } from '../services/DeletePostService'

interface IUserRequest{
  user: {
    _id: string;
    name: string;
  }
}

class DeletePostController{
  async handle(req: Request & IUserRequest, res: Response){
    req.body.userId = req.user._id
    const { postId, userId } = req.body

    const service = new DeletePostService()
    const result = await service.execute(postId, userId)

    res.status(StatusCodes.OK).json(result)
  }
}

export { DeletePostController }