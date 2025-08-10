import express, { NextFunction, Request, Response } from 'express'
import { WorkControllers } from './work.controller'
import { multerUpload } from '../../config/multer.config'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'
import auth from '../../middleware/auth'
import { USER_ROLE } from '../Auth/auth.constance'

const router = express.Router()

// Route for adding new work entry
router.post(
  '/',
  multerUpload.single('file'),  
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'No logo image uploaded for work',
      )
    }
    req.body = JSON.parse(req.body.data)  
    next()
  },
  auth(USER_ROLE.admin),
  WorkControllers.addWork, 
)

// Route for getting all work entries
router.get('/', WorkControllers.getAllWorks)

// Route for getting a work entry by ID
router.get('/:id', WorkControllers.getWorkById)

// Route for updating a work entry by ID
router.put(
  '/:id',
  multerUpload.single('file'),  
  (req: Request, res: Response, next: NextFunction) => {
    
    req.body = JSON.parse(req.body.data) 
    next()
  },
  auth(USER_ROLE.admin),
  WorkControllers.updateWork,  
)

// Route for deleting a work entry by ID
router.delete('/:id', auth(USER_ROLE.admin), WorkControllers.deleteWork)

export const WorkRoutes = router
