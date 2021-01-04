import { Router } from 'express'
import { classToClass } from 'class-transformer'

import CreateUserService from '../services/CreateUserService'
import Authentication from '../middlewares/Authentication'
import GetPostsService from '../services/GetPostsService'

const userRouter = Router()

userRouter.post('/register', async (request, response) => {
  const { username, password } = request.body

  const CreateUser = new CreateUserService()

  const user = await CreateUser.execute({ username, password })

  response.status(201).json(classToClass(user))
})

userRouter.get('/posts', Authentication, async (request, response) => {
  const GetPosts = new GetPostsService()

  const posts = await GetPosts.execute(request.user.id)

  response.status(200).json(posts)
})

export default userRouter
