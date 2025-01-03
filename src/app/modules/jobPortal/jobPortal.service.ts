import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TJobPortal } from './jobPortal.interface';
import { JobPortal } from './jobPortal.model';

const createJobPortalIntoDB = async (
  payload: Partial<TJobPortal>,
) => {
  const jobPortalData = { ...payload };
  if (!jobPortalData.clerkUserId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to create this job portal!',
    );
  }
  const jobPortal = await JobPortal.create(jobPortalData);
  return jobPortal;
};

const getAllJobPortalFromDB = async (
  clerkUserId: string,
) => {
  const result = await JobPortal.find({ clerkUserId });
  return result;
};

const getSingleJobPortalFromDB = async (clerkUserId: string, id: string) => {
  const result = await JobPortal.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Job portal not found');
  }
  if (result.clerkUserId !== clerkUserId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to access this job portal!',
    );
  }
  return result;
};

const updateJobPortalInDB = async (
  clerkUserId: string,
  id: string,
  payload: Partial<TJobPortal>,
) => {
  const jobPortal = await JobPortal.findById(id);
  if (!JobPortal) {
    throw new AppError(httpStatus.NOT_FOUND, 'Job portal not found');
  }
  if (jobPortal?.clerkUserId !== clerkUserId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to update this job portal!',
    );
  }
  const result = await JobPortal.findByIdAndUpdate(
    id,
    { ...payload },
    { new: true },
  );
  return result;
};

const deleteJobPortalFromDB = async (clerkUserId: string, id: string) => {
  const jobPortal = await JobPortal.findById(id);
  if (!jobPortal) {
    throw new AppError(httpStatus.NOT_FOUND, 'Job portal not found!');
  }
  if (jobPortal.clerkUserId !== clerkUserId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to delete this Job portal!',
    );
  }
  const result = await JobPortal.findByIdAndDelete(id);
  return result;
};

export const JobPortalServices = {
  createJobPortalIntoDB,
  getAllJobPortalFromDB,
  getSingleJobPortalFromDB,
  updateJobPortalInDB,
  deleteJobPortalFromDB
};
