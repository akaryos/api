import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'

import './database'
import routes from './routes'
import ErrorHandler from './middlewares/ErrorHandler'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', routes)
app.use(ErrorHandler)

const { PORT } = process.env

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
