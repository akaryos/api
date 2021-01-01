import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'

import './database'
import routes from './routes'
import errorHandler from './middlewares/errorHandler'

const app = express()

app.use(express.json())
app.use(routes)
app.use(errorHandler)

const { PORT } = process.env

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
