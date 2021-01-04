import { getRepository } from 'typeorm'

import File from '../models/File'

class GetPostsService {
  public async execute (id: string): Promise<File[]> {
    const filesRepository = getRepository(File)

    const files = filesRepository.find({ where: { user_id: id } })

    return files
  }
}

export default GetPostsService
