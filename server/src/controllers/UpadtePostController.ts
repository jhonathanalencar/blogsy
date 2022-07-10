import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors'
import { UpdatePostService } from '../services/UpdatePostService'

interface IUserRequest{
  user: {
    _id: string;
    name: string;
  }
}

class UpdatePostController{
  async handle(req: Request & IUserRequest, res: Response){
    req.body.userId = req.user._id
    const { userId, postId, title, text } = req.body

    if(title.trim() === '' || text.trim() === ''){
      throw new BadRequestError('Title or content cannot be empty')
    }

    const service = new UpdatePostService()
    const result = await service.execute(userId, postId, title, text)

    res.status(StatusCodes.OK).json(result)
  }
}

export { UpdatePostController }