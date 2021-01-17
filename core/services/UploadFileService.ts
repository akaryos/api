import { injectable, inject } from 'tsyringe'
import { getRepository } from 'typeorm'

import File from '../models/File'
import IStorageProvider from '../providers/StorageProvider/models/IStorageProvider'

interface Request {
  user_id: string
  name: string
  original: string
  type: string
  size: number
  url: string
}

@injectable()
class UploadFileService {
  constructor (
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute ({ user_id, name, original, type, size, url }: Request): Promise<File> {
    const filesRepository = getRepository(File)

    const file = filesRepository.create({ user_id, name, original, type, size, url })

    await this.storageProvider.saveFile(name)
    await filesRepository.save(file)

    return file
  }
}

export default UploadFileService
