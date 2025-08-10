import express, { NextFunction, Request, Response } from 'express'

import { multerUpload } from '../../config/multer.config'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { USER_ROLE } from '../Auth/auth.constance'
import auth from '../../middleware/auth'
import { ClientControllers } from './client.controller'

const router = express.Router()
router.post(
  '/',
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'No cover image uploaded for the client',
      )
    }
    req.body = {
      ...JSON.parse(req.body.data),
      image: req.file.path,
    }
    next()
  },
  auth(USER_ROLE.admin),
  ClientControllers.createClient,
)

router.put(
  '/:id',
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
      req.body = {
        ...JSON.parse(req.body.data),
        image: req.file.path,
      }
    } else {
      req.body = JSON.parse(req.body.data)
    }
    next()
  },
  auth(USER_ROLE.admin),
  ClientControllers.updateClient,
)
router.get('/', ClientControllers.getAllClients)
router.get('/:id', ClientControllers.getClientById)
router.delete('/:id', auth(USER_ROLE.admin), ClientControllers.deleteClient)

export const ClientRoutes = router
