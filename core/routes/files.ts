import { Router } from 'express'

import FilesController from '../controllers/FilesController'
import Authentication from '../middlewares/Authentication'

const filesRouter = Router()
const filesController = new FilesController()

filesRouter.use(Authentication)

filesRouter.get('/', filesController.index)

export default filesRouter
