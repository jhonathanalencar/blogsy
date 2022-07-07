import { Router } from 'express'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { RegisterUserController } from './controllers/RegisterUserController'

export const router = Router()

router.post('/register', new RegisterUserController().handle)
router.post('/authenticate', new AuthenticateUserController().handle)