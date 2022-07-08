import { Router } from 'express'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateBlogController } from './controllers/CreateBlogController'
import { RegisterUserController } from './controllers/RegisterUserController'
import { authenticationMiddleware } from './middlewares/ensureAuthenticated'

export const router = Router()

router.post('/register', new RegisterUserController().handle)
router.post('/authenticate', new AuthenticateUserController().handle)

router.post('/createBlog', authenticationMiddleware, new CreateBlogController().handle)