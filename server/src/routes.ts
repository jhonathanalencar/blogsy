import { Router } from 'express'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateBlogController } from './controllers/CreateBlogController'
import { CreatePostController } from './controllers/CreatePostController'
import { DeletePostController } from './controllers/DeletePostController'
import { GetBlogByIdController } from './controllers/GetBlogByIdController'
import { GetBlogController } from './controllers/GetBlogController'
import { GetUserController } from './controllers/GetUserController'
import { RegisterUserController } from './controllers/RegisterUserController'
import { UpdatePostController } from './controllers/UpadtePostController'
import { authenticationMiddleware } from './middlewares/ensureAuthenticated'

export const router = Router()

router.post('/register', new RegisterUserController().handle)
router.post('/authenticate', new AuthenticateUserController().handle)
router.get('/user', authenticationMiddleware, new GetUserController().handle)

router.post('/createBlog', authenticationMiddleware, new CreateBlogController().handle)
router.get('/blog', authenticationMiddleware, new GetBlogController().handle)
router.post('/blogId', new GetBlogByIdController().handle)

router.post('/post', authenticationMiddleware, new CreatePostController().handle)
router.patch('/post', authenticationMiddleware, new UpdatePostController().handle)
router.delete('/post', authenticationMiddleware, new DeletePostController().handle)