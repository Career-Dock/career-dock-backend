import { TApplication } from './application.interface';
import { Application } from './application.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createApplicationIntoDB = async (payload: Partial<TApplication>, clerkUserId: string) => {
  const applicationData = { ...payload, clerkUserId };
  const application = await Application.create(applicationData);
  return application;
};

const getAllApplicationFromDB = async (
  clerkUserId: string,
  query: Record<string, unknown>,
) => {
  const result = await Application.find({ clerkUserId, ...query });
  return result;
};

const getSingleApplicationFromDB = async (clerkUserId: string, id: string) => {
  const result = await Application.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Application not found');
  }
  if (result.clerkUserId !== clerkUserId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to access this application',
    );
  }
  return result;
};

const updateApplicationInDB = async (
  clerkUserId: string,
  id: string,
  payload: Partial<TApplication>,
) => {
  const application = await Application.findById(id);
  if (!application) {
    throw new AppError(httpStatus.NOT_FOUND, 'Application not found');
  }
  if (application.clerkUserId !== clerkUserId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to update this application',
    );
  }
  const result = await Application.findByIdAndUpdate(
    id,
    { ...payload },
    { new: true },
  );
  return result;
};

const deleteApplicationFromDB = async (clerkUserId: string, id: string) => {
  const application = await Application.findById(id);
  if (!application) {
    throw new AppError(httpStatus.NOT_FOUND, 'Application not found');
  }
  if (application.clerkUserId !== clerkUserId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to delete this application',
    );
  }
  const result = await Application.findByIdAndDelete(id);
  return result;
};

export const ApplicationServices = {
  createApplicationIntoDB,
  getAllApplicationFromDB,
  getSingleApplicationFromDB,
  updateApplicationInDB,
  deleteApplicationFromDB,
};
