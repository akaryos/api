import multer from 'multer'
import { resolve, extname } from 'path'
import { nanoid } from 'nanoid'

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'temp'),
    filename (request, file, callback) {
      return callback(null, nanoid(8) + extname(file.originalname))
    }
  }),
  limits: { fileSize: 1024 * 1024 * 2 }
}
