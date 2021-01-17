import { Request, Response } from 'express'
import { classToClass } from 'class-transformer'

import CreateUserService from '../services/CreateUserService'
import GetUserDetailsService from '../services/GetUserDetailsService'

export default class UsersController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body

    const CreateUser = new CreateUserService()

    const user = await CreateUser.execute({ username, password })

    return response.status(201).json(classToClass(user))
  }

  public async index (request: Request, response: Response): Promise<Response> {
    const GetUser = new GetUserDetailsService()

    const user = await GetUser.execute(request.user.id)

    return response.status(200).json(classToClass(user))
  }
}
