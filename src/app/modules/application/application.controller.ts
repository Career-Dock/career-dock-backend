import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { ApplicationServices } from './application.service';
import { CustomRequest } from '../../middlewares/auth';

const createApplication = catchAsync(async (req: CustomRequest, res) => {
  const result = await ApplicationServices.createApplicationIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Application registered successfully!',
    data: result,
  });
});

const getAllApplication = catchAsync(async (req: CustomRequest, res) => {
  const clerkUserId = req.auth?.userId;
  const result = await ApplicationServices.getAllApplicationFromDB(
    clerkUserId!,
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All users retrieved successfully!',
    data: result,
  });
});

const getSingleApplication = catchAsync(async (req: CustomRequest, res) => {
  const clerkUserId = req.auth?.userId;
  const result = await ApplicationServices.getSingleApplicationFromDB(
    clerkUserId!,
    req.params.id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Your data retrieved successfully!',
    data: result,
  });
});

const updateApplication = catchAsync(async (req: CustomRequest, res) => {
  const clerkUserId = req.auth?.userId;
  const result = await ApplicationServices.updateApplicationInDB(
    clerkUserId!,
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Application updated successfully!',
    data: result,
  });
});

const deleteApplication = catchAsync(async (req: CustomRequest, res) => {
  const clerkUserId = req.auth?.userId;
  const result = await ApplicationServices.deleteApplicationFromDB(
    clerkUserId!,
    req.params.id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Application deleted successfully!',
    data: result,
  });
});

export const ApplicationControllers = {
  createApplication,
  getAllApplication,
  getSingleApplication,
  updateApplication,
  deleteApplication,
};
