import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'

import User from '../models/User'
import AppError from '../errors/AppError'

interface Request {
  username: string
  password: string
}

class CreateUserService {
  public async execute ({ username, password }: Request): Promise<User> {
    const usersRepository = getRepository(User)

    const userExistence = await usersRepository.findOne({ where: { username } })

    if (userExistence) throw new AppError('User already exists')

    const hashedPassword = await hash(password, 8)

    const user = usersRepository.create({ username, password: hashedPassword, storage_usage: 0 })

    await usersRepository.save(user)

    return user
  }
}

export default CreateUserService
