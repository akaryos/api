import { Router } from 'express'

import UserController from '../controllers/UserController'
import Authentication from '../middlewares/Authentication'

const userRouter = Router()
const userController = new UserController()

userRouter.post('/register', userController.create)
userRouter.get('/posts', Authentication, userController.index)

export default userRouter
