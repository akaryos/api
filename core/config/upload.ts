import multer from 'multer'
import { resolve, extname } from 'path'
import { nanoid } from 'nanoid'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'

import AppError from '../errors/AppError'

const storageTypes = {
  disk: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'temp'),
    filename (request, file, callback) {
      return callback(null, nanoid(8) + extname(file.originalname))
    }
  }),

  s3: multerS3({
    s3: new aws.S3({
      accessKeyId: process.env.AWS_ACESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_DEFAULT_REGION
    }),
    bucket: process.env.AWS_S3_BUCKET,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key (request, file, callback) {
      return callback(null, nanoid(8) + extname(file.originalname))
    }
  })
}

export default {
  storage: storageTypes[process.env.NODE_ENV ? 's3' : 'disk'],
  fileFilter (request: any, file: { mimetype: string }, callback: (arg0: any | null, arg1: boolean | undefined) => void) {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif']

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true)
    } else {
      callback(new AppError('Invalid type file'), false)
    }
  },
  limits: { fileSize: 1024 * 1024 * 2 }
}
