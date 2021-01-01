import { Router } from 'express'
import { classToClass } from 'class-transformer'

import AuthenticateUserService from '../services/AuthenticateUserService'

const sessionRouter = Router()

sessionRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const AuthenticateUser = new AuthenticateUserService()

  const user = await AuthenticateUser.execute({ username, password })

  response.status(200).json(classToClass(user))
})

export default sessionRouter
