import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'

import './database'
import routes from './routes'
import errorHandler from './middlewares/errorHandler'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(errorHandler)

const { PORT } = process.env

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
