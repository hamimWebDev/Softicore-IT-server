import { Request, Response } from 'express';
import { TeamServices } from './team.services';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsynch';
import sendResponse from '../../utils/sendResponse';

export const TeamControllers = {
  createTeam: catchAsync(async (req: Request, res: Response) => {
    const teamData = req.body;
    const file = req.file;
    const result = await TeamServices.addTeam(teamData, file);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Team created successfully',
      data: result,
    });
  }),

  getAllTeams: catchAsync(async (req: Request, res: Response) => {
    const result = await TeamServices.getAllTeams();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Teams retrieved successfully',
      data: result,
    });
  }),

  getTeamById: catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await TeamServices.getTeamById(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Team retrieved successfully',
      data: result,
    });
  }),

  updateTeam: catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const teamData = req.body;
    const file = req.file;
    const result = await TeamServices.updateTeam(id, teamData, file);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Team updated successfully',
      data: result,
    });
  }),

  deleteTeam: catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await TeamServices.deleteTeam(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Team deleted successfully',
      data: result,
    });
  }),
};
