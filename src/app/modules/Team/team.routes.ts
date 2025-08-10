import express, { NextFunction, Request, Response } from 'express'
import { TeamControllers } from './team.controller'
import { multerUpload } from '../../config/multer.config'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import { USER_ROLE } from '../Auth/auth.constance'
import auth from '../../middleware/auth'

const router = express.Router()
router.post(
  '/',
  multerUpload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'No image uploaded for the team member',
      )
    }
    req.body = {
      ...JSON.parse(req.body.data),
      image: req.file.path,
    }
    next()
  },
  auth(USER_ROLE.admin),
  TeamControllers.createTeam,
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
  TeamControllers.updateTeam,
)
router.get('/', TeamControllers.getAllTeams)
router.get('/:id', TeamControllers.getTeamById)
router.delete('/:id', auth(USER_ROLE.admin), TeamControllers.deleteTeam)

export const TeamRoutes = router
