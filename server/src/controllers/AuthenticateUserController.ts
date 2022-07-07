import { Request, Response } from 'express'
import { AuthenticateUserService } from '../services/AuthenticateUserService'

class AuthenticateUserController{
  async handle(req: Request, res: Response){
    const { email, password } = req.body

    if(!email || !password){
      throw new Error('Please provide email and password')
    }

    const service = new AuthenticateUserService()

    try{
      const result = await service.execute(email, password)
      return res.status(200).json(result)
    }catch(error){
      return res.status(400).json({error: error.message})
    }

  }
}

export { AuthenticateUserController }