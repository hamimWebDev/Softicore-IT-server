import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { ILoginUser, IUser } from './auth.interface'
import { User } from './auth.model'
import { createToken, verifyToken } from './auth.utils'
import config from '../../config'

const signUpUserIntoDb = async (payload: IUser) => {
  const user = await User.findOne({ email: payload.email })
  if (user) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This email is already taken')
  }

  const result = await User.create(payload)
  return result
}

const loginUser = async (payload: ILoginUser) => {
  const user = await User.isUserExistsByEmail(payload?.email)

  // if user not found
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found')
  }

  if (!(await User.isUserPasswordMatch(payload?.password, user?.password))) {
    throw new AppError(httpStatus.NOT_FOUND, 'Incorrect password')
  }

  // access Granted token and refresh token;
  //   create token and sent to the client

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
    name: user?.name,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string,
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refrsh_expire_in as string,
  )

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  }
}

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string)

  const { email, iat } = decoded
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(email)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !')
  }

  const jwtPayload = {
    email: user?.email,
    role: user?.role,
    name: user?.name,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string,
  )

  return {
    accessToken,
  }
}

export const AuthServices = {
  signUpUserIntoDb,
  loginUser,
  refreshToken
}
