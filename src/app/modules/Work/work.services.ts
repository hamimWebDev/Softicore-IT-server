import { IWork } from './work.interface'
import { Work } from './work.model'
import AppError from '../../errors/AppError'
import httpStatus from 'http-status'

const addWorkToDb = async (payload: any, file: any) => {
  const workData = {
    ...payload,
    image: file?.path,
  }

  // Save the work data in the database
  const result = await Work.create(workData)
  return result
}

// Get all work entries
const getAllWorksFromDb = async () => {
  const works = await Work.find()
  return works
}

// Get work entry by ID
const getWorkByIdFromDb = async (id: string) => {
  const work = await Work.findById(id)
  if (!work) {
    throw new AppError(httpStatus.NOT_FOUND, 'Work not found')
  }
  return work
}

const updateWorkInDb = async (id: string, payload: any, file: any) => {
  let updatedData = payload
  if (file?.path) {
    updatedData = {
      ...payload,
      image: file?.path,
    }
  }
  // Update the work entry by its ID
  const result = await Work.findByIdAndUpdate(id, updatedData, { new: true })
  return result
}

// Delete a work entry by ID
const deleteWorkFromDb = async (id: string) => {
  const deletedWork = await Work.findByIdAndDelete(id)
  if (!deletedWork) {
    throw new AppError(httpStatus.NOT_FOUND, 'Work not found')
  }
  return deletedWork
}

export const WorkServices = {
  addWorkToDb,
  getAllWorksFromDb,
  getWorkByIdFromDb,
  updateWorkInDb,
  deleteWorkFromDb,
}
