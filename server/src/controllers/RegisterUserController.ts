import { Request, Response } from 'express'
import { RegisterUserService } from '../services/RegisterUserService'

class RegisterUserController{
  async handle(req: Request, res: Response){
    const { name, email, password } = req.body

    const service = new RegisterUserService()

    if(!name || !email || !password){
      throw new Error('Please provide name, email and password')
    }

    try{
      const result = await service.execute(name, email, password)
      return res.status(201).json(result)
    }catch(error){
      return res.status(401).json({ error: error.message })
    }
  }
}

export { RegisterUserController }