import { Request, Response } from 'express'
import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsynch'
import { WorkServices } from './work.services'

// Controller to add a new work entry
const addWork = catchAsync(async (req: Request, res: Response) => {
  const workData = req.body
  const file = req.file
  // Call the service to add the work to the database
  const result = await WorkServices.addWorkToDb(workData, file)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Work added successfully',
    data: result,
  })
})

// Controller to get all work entries
const getAllWorks = catchAsync(async (req: Request, res: Response) => {
  const result = await WorkServices.getAllWorksFromDb()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All works retrieved successfully',
    data: result,
  })
})

// Controller to get a single work entry by ID
const getWorkById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await WorkServices.getWorkByIdFromDb(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Work retrieved successfully',
    data: result,
  })
})

// Controller to update a work entry by ID
const updateWork = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const workData = req.body
  const file = req?.file
  const result = await WorkServices.updateWorkInDb(id, workData, file)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Work updated successfully',
    data: result,
  })
})
// Controller to delete a work entry by ID
const deleteWork = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  await WorkServices.deleteWorkFromDb(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Work deleted successfully',
    data: '',
  })
})

export const WorkControllers = {
  addWork,
  getAllWorks,
  getWorkById,
  updateWork,
  deleteWork,
}
