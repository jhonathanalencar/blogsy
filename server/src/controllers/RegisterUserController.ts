import { Request, Response } from 'express'
import { BadRequestError } from '../errors'
import { RegisterUserService } from '../services/RegisterUserService'
import { StatusCodes } from 'http-status-codes'

class RegisterUserController{
  async handle(req: Request, res: Response){
    const { name, email, password } = req.body

    const service = new RegisterUserService()

    if(!name || name.trim() === ''){
      throw new BadRequestError('Please provide name')
    }else if(!email || email.trim() === ''){
      throw new BadRequestError('Please provide email')
    }else if(!password || password.trim() === ''){
      throw new BadRequestError('Please provide password')
    }

    const result = await service.execute(name, email, password)
    return res.status(StatusCodes.CREATED).json(result)

  }
}

export { RegisterUserController }