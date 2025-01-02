import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TApplicationShare } from './applicationShare.interface';
import { ApplicationShare } from './applicationShare.model';
import { ApplicationServices } from '../application/application.service';
// import AppError from '../../errors/AppError';
// import httpStatus from 'http-status';

const createApplicationShareIntoDB = async (
  payload: Partial<TApplicationShare>,
) => {
  const applicationData = { ...payload };
  if (!applicationData.clerkUserId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to create this application group',
    );
  }
  const application = await ApplicationShare.create(applicationData);
  return application;
};

const getAllApplicationShareFromDB = async (
  clerkUserId: string,
) => {
  const result = await ApplicationShare.findOne({ clerkUserId });
  return result;
};

const getAllApplicationsOfThisShareFromDB = async (
  clerkUserId: string,
  shareId: string,
) => {
  const applicationShare = await ApplicationShare.findById(shareId);
  if (!applicationShare) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid share found');
  }
  const query = applicationShare.query;
  const result = await ApplicationServices.getAllApplicationFromDB(clerkUserId, query);
  return result;
};

const getSingleApplicationShareFromDB = async (clerkUserId: string, id: string) => {
  const result = await ApplicationShare.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Application share not found');
  }
  if (result.clerkUserId !== clerkUserId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to access this application share',
    );
  }
  return result;
};

const updateApplicationShareInDB = async (
  clerkUserId: string,
  id: string,
  payload: Partial<TApplicationShare>,
) => {
  const applicationShare = await ApplicationShare.findById(id);
  if (!applicationShare) {
    throw new AppError(httpStatus.NOT_FOUND, 'Application share not found');
  }
  if (applicationShare.clerkUserId !== clerkUserId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to update this application share!',
    );
  }
  const result = await ApplicationShare.findByIdAndUpdate(
    id,
    { ...payload },
    { new: true },
  );
  return result;
};

const deleteApplicationShareFromDB = async (clerkUserId: string, id: string) => {
  const application = await ApplicationShare.findById(id);
  if (!application) {
    throw new AppError(httpStatus.NOT_FOUND, 'Application share not found');
  }
  if (application.clerkUserId !== clerkUserId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to delete this application share',
    );
  }
  const result = await ApplicationShare.findByIdAndDelete(id);
  return result;
};

const pauseApplicationShareFromDB = async (clerkUserId: string, id: string, isPaused: boolean) => {
  const application = await ApplicationShare.findById(id);
  if (!application) {
    throw new AppError(httpStatus.NOT_FOUND, 'Application share not found');
  }
  if (application.clerkUserId !== clerkUserId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to pause this application share',
    );
  }
  const result = await ApplicationShare.findByIdAndUpdate(id, { isPaused }, { new: true });
  return result;
};

export const ApplicationShareServices = {
  createApplicationShareIntoDB,
  getAllApplicationShareFromDB,
  getAllApplicationsOfThisShareFromDB,
  getSingleApplicationShareFromDB,
  updateApplicationShareInDB,
  deleteApplicationShareFromDB,
  pauseApplicationShareFromDB
};
