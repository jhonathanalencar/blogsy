import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { AddFavoriteService } from '../services/AddFavoriteService';

interface UserType{
  user: {
    _id: string;
    name: string;
  }
}

class AddFavoriteController{
  async handle(req: Request & UserType, res: Response){
    req.body.favoritedBy = req.user._id

    const { favoritedBy, publishedPost } = req.body

    const service = new AddFavoriteService()
    const result = await service.execute(favoritedBy, publishedPost)

    res.status(StatusCodes.CREATED).json(result)
  }
}

export { AddFavoriteController }