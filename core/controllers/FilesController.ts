import { Request, Response } from 'express'

import GetFilesService from '../services/GetFilesService'

class FilesController {
  public async index (request: Request, response: Response): Promise<void> {
    const GetFiles = new GetFilesService()

    const files = await GetFiles.execute(request.user.id)

    response.status(200).json(files)
  }
}

export default FilesController
