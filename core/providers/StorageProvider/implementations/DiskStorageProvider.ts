import fs from 'fs'
import { resolve } from 'path'

import IStorageProvider from '../models/IStorageProvider'
import uploadConfig from '../../../config/upload'

class DiskStorageProvider implements IStorageProvider {
  public async saveFile (file: string): Promise<string> {
    await fs.promises.rename(
      resolve(uploadConfig.directory, file),
      resolve(uploadConfig.directory, 'uploads', file)
    )

    return file
  }

  public async deleteFile (file: string): Promise<void> {
    const fileDirectory = resolve(uploadConfig.directory, 'uploads', file)
    const fileExistence = await fs.promises.stat(fileDirectory)

    if (fileExistence) {
      await fs.promises.unlink(fileDirectory)
    }
  }
}

export default DiskStorageProvider
