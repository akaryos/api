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
    const usersRepository = getRepository(User)
    const filesRepository = getRepository(File)

    const user = await usersRepository.findOne({ where: { id: user_id } })

    if (user.storage_usage >= 10E8) throw new AppError('You have no space to store more files')

    const file = filesRepository.create({ user_id, name, original, type, size, url })

    await this.storageProvider.saveFile(name)
    await usersRepository.update(user_id, {
      storage_usage: file.size + user.storage_usage
    })
    await filesRepository.save(file)

    return file
  }
}

export default UploadFileService
