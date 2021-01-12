import { Request, Response } from 'express'

import UploadFileService from '../services/UploadFileService'

export default class UploadController {
  public async store (request: Request, response: Response): Promise<Response> {
    const {
      key,
      filename,
      originalname: original,
      mimetype: type,
      size,
      location: url = ''
    } = request.file

    const UploadFile = new UploadFileService()

    const file = await UploadFile.execute({
      user_id: request.user.id,
      name: filename || key,
      original,
      type,
      size,
      url
    })

    return response.status(200).json(file)
  }
}
