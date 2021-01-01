import { Router } from 'express'
import { classToClass } from 'class-transformer'

import CreateUserService from '../services/CreateUserService'

const userRouter = Router()

userRouter.post('/register', async (request, response) => {
  const { username, password } = request.body

  const CreateUser = new CreateUserService()

  const user = await CreateUser.execute({ username, password })

  response.status(201).json(classToClass(user))
})

export default userRouter
