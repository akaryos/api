import { Router } from 'express'
import multer from 'multer'

import UploadController from '../controllers/UploadController'
import Authentication from '../middlewares/Authentication'
import uploadConfig from '../config/upload'

const uploadRouter = Router()
const uploadController = new UploadController()

uploadRouter.use(Authentication)

uploadRouter.post('/', multer(uploadConfig).single('file'), uploadController.store)

export default uploadRouter
