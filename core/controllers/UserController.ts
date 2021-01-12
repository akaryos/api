import { Request, Response } from 'express'
import { classToClass } from 'class-transformer'

import CreateUserService from '../services/CreateUserService'
import GetPostsService from '../services/GetPostsService'

export default class UserController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body

    const CreateUser = new CreateUserService()

    const user = await CreateUser.execute({ username, password })

    return response.status(201).json(classToClass(user))
  }

  public async index (request: Request, response: Response): Promise<Response> {
    const GetPosts = new GetPostsService()

    const posts = await GetPosts.execute(request.user.id)

    return response.status(200).json(posts)
  }
}
