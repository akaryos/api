import aws, { S3 } from 'aws-sdk'
import { resolve } from 'path'
import fs from 'fs'
import mime from 'mime'

import IStorageProvider from '../models/IStorageProvider'
import uploadConfig from '../../../config/upload'

class S3StorageProvider implements IStorageProvider {
  private client: S3

  constructor () {
    this.client = new aws.S3({
      accessKeyId: process.env.AWS_ACESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_DEFAULT_REGION
    })
  }

  public async saveFile (file: string): Promise<string> {
    const originalDirectory = resolve(uploadConfig.directory, file)

    const Body = await fs.promises.readFile(originalDirectory)
    const ContentType = mime.getType(originalDirectory)

    if (!ContentType) throw new Error('File not found')

    await this.client.putObject({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: file,
      ACL: 'public-read',
      Body,
      ContentType
    }).promise()

    await fs.promises.unlink(originalDirectory)

    return file
  }

  public async deleteFile (file: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: file
    }).promise()
  }
}

export default S3StorageProvider
