import { getRepository } from 'typeorm'

import File from '../models/File'

class GetFilesService {
  public async execute (id: string): Promise<File[]> {
    const filesRepository = getRepository(File)

    const files = await filesRepository.find({ where: { user_id: id } })

    return files
  }
}

export default GetFilesService
