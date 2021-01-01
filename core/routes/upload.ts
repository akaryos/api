import { Router } from 'express'
import multer from 'multer'

import Authentication from '../middlewares/Authentication'
import uploadConfig from '../config/upload'
import UploadFileService from '../services/UploadFileService'

const uploadRouter = Router()

uploadRouter.use(Authentication)

uploadRouter.post('/', multer(uploadConfig).single('file'), async (request, response) => {
  const UploadFile = new UploadFileService()

  const file = await UploadFile.execute({
    user_id: request.user.id,
    name: request.file.filename,
    original: request.file.originalname,
    type: request.file.mimetype,
    size: request.file.size,
    url: ''
  })

  response.status(200).json(file)
})

export default uploadRouter
