import { getRepository } from 'typeorm'

import File from '../models/File'

interface Request {
  user_id: string
  name: string
  original: string
  type: string
  size: number
  url: string
}

class UploadFileService {
  public async execute ({ user_id, name, original, type, size, url }: Request): Promise<File> {
    const filesRepository = getRepository(File)

    const file = filesRepository.create({ user_id, name, original, type, size, url })

    await filesRepository.save(file)

    return file
  }
}

export default UploadFileService
