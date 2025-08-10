import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import { AuthServices } from './auth.services'
import catchAsync from '../../utils/catchAsynch'
import config from '../../config'

const singupUser = catchAsync(async (req, res) => {
  const user = req.body
  const result = await AuthServices.signUpUserIntoDb(user)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is registered successfully',
    data: result,
  })
})

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body)
  const { accessToken, needsPasswordChange, refreshToken } = result
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  })

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged succesfully',
    data: { needsPasswordChange, accessToken, refreshToken },
  })
})

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies
  const result = await AuthServices.refreshToken(refreshToken)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  })
})

export const AuthControllers = {
  singupUser,
  loginUser,
  refreshToken,
}
