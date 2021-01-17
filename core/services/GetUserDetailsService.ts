import { getRepository } from 'typeorm'

import User from '../models/User'

class GetUserDetailsService {
  public async execute (id: string) {
    const usersRepository = getRepository(User)

    const user = usersRepository.findOne({ where: { id } })

    return user
  }
}

export default GetUserDetailsService
