import { resolve, extname } from 'path'
import multer from 'multer'
import { nanoid } from 'nanoid'
import { Request } from 'express'

import AppError from '../errors/AppError'

const tempDirectory = resolve(__dirname, '..', '..', 'temp')

interface FileFilterCallback {
  (error: AppError): void
  (error: null, acceptFile: boolean): void
}

export default {
  directory: tempDirectory,

  storage: multer.diskStorage({
    destination: tempDirectory,
    filename (request, file, callback) {
      return callback(null, nanoid(8) + extname(file.originalname))
    }
  }),
  fileFilter (request: Request, file: { mimetype: string }, callback: FileFilterCallback) {
    const allowedMimes = ['image/png', 'image/jpeg', 'image/pjpeg', 'image/gif']

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true)
    } else {
      callback(new AppError('Invalid type file'))
    }
  },
  limits: { fileSize: 1024 * 1024 * 2 }
}
