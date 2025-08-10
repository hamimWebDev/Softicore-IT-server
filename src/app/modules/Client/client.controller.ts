import { Request, Response } from 'express';
import { ClientServices } from './client.services';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsynch';
import sendResponse from '../../utils/sendResponse';

export const ClientControllers = {
  createClient: catchAsync(async (req: Request, res: Response) => {
    const clientData = req.body;
    const result = await ClientServices.addClient(clientData);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Client created successfully',
      data: result,
    });
  }),

  getAllClients: catchAsync(async (req: Request, res: Response) => {
    const result = await ClientServices.getAllClients();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Clients retrieved successfully',
      data: result,
    });
  }),

  getClientById: catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await ClientServices.getClientById(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Client retrieved successfully',
      data: result,
    });
  }),

  updateClient: catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const clientData = req.body;
    const result = await ClientServices.updateClient(id, clientData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Client updated successfully',
      data: result,
    });
  }),

  deleteClient: catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await ClientServices.deleteClient(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Client deleted successfully',
      data: result,
    });
  }),
};
