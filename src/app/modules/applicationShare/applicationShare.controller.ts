import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { ApplicationShareServices } from './applicationShare.service';
import { CustomRequest } from '../../middlewares/auth';

const createApplicationShare = catchAsync(async (req: CustomRequest, res) => {
  const result = await ApplicationShareServices.createApplicationShareIntoDB({
    ...req.body,
    clerkUserId: req.auth?.userId as string,
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Application share created successfully!',
    data: result,
  });
});

const getAllApplicationShare = catchAsync(async (req: CustomRequest, res) => {
  const clerkUserId = req.auth?.userId;
  const result = await ApplicationShareServices.getAllApplicationShareFromDB(
    clerkUserId!
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All application share retrieved successfully!',
    data: result,
  });
});

const getAllApplicationOfThiShare = catchAsync(async (req: CustomRequest, res) => {
  const clerkUserId = req.auth?.userId;
  const result = await ApplicationShareServices.getAllApplicationsOfThisShareFromDB(
    clerkUserId!,
    req.params.shareId
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All applications of this share retrieved successfully!',
    data: result,
  });
});

const getSingleApplicationShare = catchAsync(async (req: CustomRequest, res) => {
  const clerkUserId = req.auth?.userId;
  const result = await ApplicationShareServices.getSingleApplicationShareFromDB(
    clerkUserId!,
    req.params.id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Application share retrieved successfully!',
    data: result,
  });
});

const updateApplicationShare = catchAsync(async (req: CustomRequest, res) => {
  const clerkUserId = req.auth?.userId;
  const result = await ApplicationShareServices.updateApplicationShareInDB(
    clerkUserId!,
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Application Share updated successfully!',
    data: result,
  });
});

const deleteApplicationShare = catchAsync(async (req: CustomRequest, res) => {
  const clerkUserId = req.auth?.userId;
  const result = await ApplicationShareServices.deleteApplicationShareFromDB(
    clerkUserId!,
    req.params.id,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Application Share deleted successfully!',
    data: result,
  });
});

const pauseApplicationShare = catchAsync(async (req: CustomRequest, res) => {
  const clerkUserId = req.auth?.userId;
  const result = await ApplicationShareServices.pauseApplicationShareFromDB(
    clerkUserId!,
    req.params.id,
    req.body.isPaused
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Application Share updated successfully!',
    data: result,
  });
});

export const ApplicationShareControllers = {
  createApplicationShare,
  getAllApplicationShare,
  getAllApplicationOfThiShare,
  getSingleApplicationShare,
  updateApplicationShare,
  deleteApplicationShare,
  pauseApplicationShare
};
