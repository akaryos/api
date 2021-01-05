import { Request, Response, NextFunction } from 'express'

import AppError from '../errors/AppError'

export default function (error: Error, request: Request, response: Response, next: NextFunction) {
  if (error instanceof AppError) {
    return response.json({ status: error.statusCode, message: error.message })
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return response.status(500).json({ status: 'error', message: 'Internal server error' })
}
