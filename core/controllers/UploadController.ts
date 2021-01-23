import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UploadFileService from '../services/UploadFileService'
import { nodeENV } from '../utils/Constants'

export default class UploadController {
  public async store (request: Request, response: Response): Promise<Response> {
    const {
      filename: name,
      originalname: original,
      mimetype: type,
      size
    } = request.file

    const UploadFile = container.resolve(UploadFileService)

    const file = await UploadFile.execute({
      user_id: request.user.id,
      name,
      original,
      type,
      size,
      url: nodeENV(`https://${process.env.AWS_S3_BUCKET}/${name}`, `http://localhost:${process.env.PORT}/${name}`)
    })

    return response.status(200).json(file)
  }
}
