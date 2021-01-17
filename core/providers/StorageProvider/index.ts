import { container } from 'tsyringe'

import IStorageProvider from './models/IStorageProvider'
import { nodeENV } from '../../utils/Constants'

import DiskStorageProvider from './implementations/DiskStorageProvider'
import S3StorageProvider from '../StorageProvider/implementations/S3StorageProvider'

container.registerSingleton<IStorageProvider>('StorageProvider', nodeENV(S3StorageProvider, DiskStorageProvider))
