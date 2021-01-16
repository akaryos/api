import { Router } from 'express'

import UserController from '../controllers/UsersController'
import Authentication from '../middlewares/Authentication'

const usersRouter = Router()
const usersController = new UserController()

usersRouter.post('/register', usersController.create)
usersRouter.get('/me', Authentication, usersController.index)

export default usersRouter
