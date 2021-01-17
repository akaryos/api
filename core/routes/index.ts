import { Router } from 'express'

import sessionRouter from './session'
import uploadRouter from './upload'
import usersRouter from './users'

const routes = Router()

routes.use('/session', sessionRouter)
routes.use('/upload', uploadRouter)
routes.use('/users', usersRouter)

export default routes
