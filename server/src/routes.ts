import { Router } from 'express'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateBlogController } from './controllers/CreateBlogController'
import { CreatePostController } from './controllers/CreatePostController'
import { GetUserController } from './controllers/GetUserService'
import { RegisterUserController } from './controllers/RegisterUserController'
import { authenticationMiddleware } from './middlewares/ensureAuthenticated'

export const router = Router()

router.post('/register', new RegisterUserController().handle)
router.post('/authenticate', new AuthenticateUserController().handle)
router.get('/user', authenticationMiddleware, new GetUserController().handle)

router.post('/createBlog', authenticationMiddleware, new CreateBlogController().handle)
router.post('/createPost', authenticationMiddleware, new CreatePostController().handle)