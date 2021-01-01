import { Router } from 'express'

import sessionRouter from './session'
import uploadRouter from './upload'
import userRouter from './user'

const routes = Router()

routes.use('/session', sessionRouter)
routes.use('/upload', uploadRouter)
routes.use('/user', userRouter)

export default routes
