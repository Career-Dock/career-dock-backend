import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { ApplicationGroupServices } from './applicationGroup.service';
import { CustomRequest } from '../../middlewares/auth';

const createApplicationGroup = catchAsync(async (req: CustomRequest, res) => {
  const result = await ApplicationGroupServices.createApplicationGroupIntoDB({
    ...req.body,
    clerkUserId: req.auth?.userId as string,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ApplicationGroup registered successfully!',
    data: result,
  });
});

const getAllApplicationGroup = catchAsync(async (req: CustomRequest, res) => {
  const clerkUserId = req.auth?.userId;
  const result = await ApplicationGroupServices.getAllApplicationGroupFromDB(
    clerkUserId!,
    req.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All application board retrieved successfully!',
    data: result,
  });
});

// const getSingleApplicationGroup = catchAsync(async (req: CustomRequest, res) => {
//   const clerkUserId = req.auth?.userId;
//   const result = await ApplicationGroupServices.getSingleApplicationGroupFromDB(
//     clerkUserId!,
//     req.params.id,
//   );

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Your data retrieved successfully!',
//     data: result,
//   });
// });

const updateApplicationGroup = catchAsync(async (req: CustomRequest, res) => {
  const clerkUserId = req.auth?.userId;
  const result = await ApplicationGroupServices.updateApplicationGroupInDB(
    clerkUserId!,
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ApplicationGroup updated successfully!',
    data: result,
  });
});

const deleteApplicationGroup = catchAsync(async (req: CustomRequest, res) => {
  const clerkUserId = req.auth?.userId;
  const result = await ApplicationGroupServices.deleteApplicationGroupFromDB(
    clerkUserId!,
    req.params.id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ApplicationGroup deleted successfully!',
    data: result,
  });
});

export const ApplicationGroupControllers = {
  createApplicationGroup,
  getAllApplicationGroup,
  // getSingleApplicationGroup,
  updateApplicationGroup,
  deleteApplicationGroup,
};
