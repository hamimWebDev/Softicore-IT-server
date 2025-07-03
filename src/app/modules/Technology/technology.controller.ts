import { Request, Response } from 'express';
import { TechnologyServices } from './technology.services';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsynch';
import sendResponse from '../../utils/sendResponse';

export const TechnologyControllers = {
  createTechnology: catchAsync(async (req: Request, res: Response) => {
    const technologyData = req.body;
    const file = req.file;
    const result = await TechnologyServices.addTechnology(technologyData, file);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Technology created successfully',
      data: result,
    });
  }),

  getAllTechnologies: catchAsync(async (req: Request, res: Response) => {
    const result = await TechnologyServices.getAllTechnologies();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Technologies retrieved successfully',
      data: result,
    });
  }),

  getTechnologyById: catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await TechnologyServices.getTechnologyById(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Technology retrieved successfully',
      data: result,
    });
  }),

  updateTechnology: catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const technologyData = req.body;
    const file = req.file;
    const result = await TechnologyServices.updateTechnology(id, technologyData, file);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Technology updated successfully',
      data: result,
    });
  }),

  deleteTechnology: catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await TechnologyServices.deleteTechnology(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Technology deleted successfully',
      data: result,
    });
  }),
};
