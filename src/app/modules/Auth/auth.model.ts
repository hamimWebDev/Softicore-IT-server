import { model, Schema, Types } from 'mongoose'
import { IUser, UserModel } from './auth.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Trim whitespace
      lowercase: true, // Convert to lowercase for consistency
    },
    password: {
      type: String,
      required: true,
      select: false, 
    },
    role: {
      type: String,
      enum: ["admin"],
      required: true,
    },

    needsPasswordChange: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// Hash password before saving the user
userSchema.pre('save', async function (next) {
  const user = this

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next()
  }

  try {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    )
    next()
  } catch (error: any) {
    return next(error) // Handle errors if hashing fails
  }
})

// Method to find user by email
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await this.findOne({ email }).select('+password') // Always include password for comparison
}

// Set password to an empty string after saving for security
userSchema.post('save', function (doc, next) {
  doc.password = '' // Clear password after saving
  next()
})

// Method to compare password during login
userSchema.statics.isUserPasswordMatch = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword)
}

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000
  return passwordChangedTime > jwtIssuedTimestamp
}

// Export the user model
export const User = model<IUser, UserModel>('User', userSchema)
