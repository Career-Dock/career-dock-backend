import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { JobPortalServices } from './jobPortal.service';
import { CustomRequest } from '../../middlewares/auth';

const createJobPortal = catchAsync(async (req: CustomRequest, res) => {
  const result = await JobPortalServices.createJobPortalIntoDB({
    ...req.body,
    clerkUserId: req.auth?.userId as string,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job portal created successfully!',
    data: result,
  });
});

const getAllJobPortal = catchAsync(async (req: CustomRequest, res) => {
  const clerkUserId = req.auth?.userId;
  const result = await JobPortalServices.getAllJobPortalFromDB(
    clerkUserId!
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Job portal retrieved successfully!',
    data: result,
  });
});

const getSingleJobPortal = catchAsync(async (req: CustomRequest, res) => {
  const clerkUserId = req.auth?.userId;
  const result = await JobPortalServices.getSingleJobPortalFromDB(
    clerkUserId!,
    req.params.id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job portal retrieved successfully!',
    data: result,
  });
});

const updateJobPortal = catchAsync(async (req: CustomRequest, res) => {
  const clerkUserId = req.auth?.userId;
  const result = await JobPortalServices.updateJobPortalInDB(
    clerkUserId!,
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job portal updated successfully!',
    data: result,
  });
});

const deleteJobPortal = catchAsync(async (req: CustomRequest, res) => {
  const clerkUserId = req.auth?.userId;
  const result = await JobPortalServices.deleteJobPortalFromDB(
    clerkUserId!,
    req.params.id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Job portal deleted successfully!',
    data: result,
  });
});

export const JobPortalControllers = {
  createJobPortal,
  getAllJobPortal,
  getSingleJobPortal,
  updateJobPortal,
  deleteJobPortal,
};
