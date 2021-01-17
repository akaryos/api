import { Request, Response } from 'express'
import { classToClass } from 'class-transformer'

import AuthenticateUserService from '../services/AuthenticateUserService'

export default class SessionController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body

    const AuthenticateUser = new AuthenticateUserService()

    const user = await AuthenticateUser.execute({ username, password })

    return response.status(200).json(classToClass(user))
  }
}
