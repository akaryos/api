import { injectable, inject } from 'tsyringe'
import { getRepository } from 'typeorm'

import IStorageProvider from '../providers/StorageProvider/models/IStorageProvider'
import User from '../models/User'
import File from '../models/File'
import AppError from '../errors/AppError'

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
    const userRepository = getRepository(User)
    const filesRepository = getRepository(File)

    const user = await userRepository.findOne({ where: { id: user_id } })
    const file = filesRepository.create({ user_id, name, original, type, size, url })

    if (user.storage >= 1E8) throw new AppError('You not have space for store this')

    await this.storageProvider.saveFile(name)
    await userRepository.update(user_id, {
      storage: file.size + user.storage
    })
    await filesRepository.save(file)

    return file
  }
}

export default UploadFileService
