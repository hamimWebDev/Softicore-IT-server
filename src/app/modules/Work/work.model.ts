import { model, Schema } from 'mongoose'
import { IWork } from './work.interface'

// Define the Mongoose schema for a work entry
const workSchema = new Schema<IWork>(
  {
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    frontend: {
      type: String,
    },
    backend: {
      type: String,
    },
    liveLink: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    technologies: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

// Export the work model
export const Work = model<IWork>('Work', workSchema)
