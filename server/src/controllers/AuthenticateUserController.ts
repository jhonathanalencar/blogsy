import { Request, Response } from 'express'
import { BadRequestError } from '../errors'
import { AuthenticateUserService } from '../services/AuthenticateUserService'
import { StatusCodes } from 'http-status-codes'

class AuthenticateUserController{
  async handle(req: Request, res: Response){
    const { email, password } = req.body

    if(!email || email.trim() === ''){
      throw new BadRequestError('Please provide email')
    }else if(!password || password.trim() === ''){
      throw new BadRequestError('Please provide password')
    }

    const service = new AuthenticateUserService()

    const result = await service.execute(email, password)
    return res.status(StatusCodes.OK).json(result)
  }
}

export { AuthenticateUserController }