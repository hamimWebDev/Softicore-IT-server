import express, { NextFunction, Request, Response } from 'express'
import { AuthControllers } from './auth.controller'
import validateRequest from '../../middleware/validateRequest'
import { AuthValidation } from './auth.validation'
import auth from '../../middleware/auth'
import { USER_ROLE } from './auth.constance'
const router = express.Router()

// signup user
router.post(
  '/signup',
  auth(USER_ROLE.admin),
  AuthControllers.singupUser,
  validateRequest(AuthValidation.userValidationSchema),
)

// login user
router.post(
  '/login',
  AuthControllers.loginUser,
  validateRequest(AuthValidation.loginValidationSchema),
)

// refresh token
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
)

export const AuthRoutes = router
