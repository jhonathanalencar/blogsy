import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { GetAllFavoritesByIdService } from '../services/GetAllFavoritesByIdService'

class GetAllFavoritesByIdController{
  async handle(req: Request, res: Response){
    const { postId } = req.body

    const service = new GetAllFavoritesByIdService()
    const result = await service.execute(postId)

    res.status(StatusCodes.OK).json(result)
  }
}

export { GetAllFavoritesByIdController }