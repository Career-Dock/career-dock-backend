import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TApplicationGroup } from './applicationGroup.interface';
import { ApplicationGroup } from './applicationGroup.model';
// import AppError from '../../errors/AppError';
// import httpStatus from 'http-status';

const createApplicationGroupIntoDB = async (
  payload: Partial<TApplicationGroup>,
) => {
  const applicationData = { ...payload };
  if (!applicationData.clerkUserId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to create this application group',
    );
  }
  const application = await ApplicationGroup.create(applicationData);
  return application;
};

const getAllApplicationGroupFromDB = async (
  clerkUserId: string,
  query: Record<string, unknown>,
) => {
  const result = await ApplicationGroup.find({ clerkUserId, ...query });
  return result;
};

// const getSingleApplicationGroupFromDB = async (clerkUserId: string, id: string) => {
//   const result = await ApplicationGroup.findById(id);
//   if (!result) {
//     throw new AppError(httpStatus.NOT_FOUND, 'ApplicationGroup not found');
//   }
//   if (result.userId !== clerkUserId) {
//     throw new AppError(
//       httpStatus.UNAUTHORIZED,
//       'You are not authorized to access this application',
//     );
//   }
//   return result;
// };

// const updateApplicationGroupInDB = async (
//   clerkUserId: string,
//   id: string,
//   payload: Partial<TApplicationGroup>,
// ) => {
//   const application = await ApplicationGroup.findById(id);
//   if (!application) {
//     throw new AppError(httpStatus.NOT_FOUND, 'ApplicationGroup not found');
//   }
//   if (application.clerkUserId !== clerkUserId) {
//     throw new AppError(
//       httpStatus.UNAUTHORIZED,
//       'You are not authorized to update this application',
//     );
//   }
//   const result = await ApplicationGroup.findByIdAndUpdate(
//     id,
//     { ...payload },
//     { new: true },
//   );
//   return result;
// };

// const deleteApplicationGroupFromDB = async (clerkUserId: string, id: string) => {
//   const application = await ApplicationGroup.findById(id);
//   if (!application) {
//     throw new AppError(httpStatus.NOT_FOUND, 'ApplicationGroup not found');
//   }
//   if (application.clerkUserId !== clerkUserId) {
//     throw new AppError(
//       httpStatus.UNAUTHORIZED,
//       'You are not authorized to delete this application',
//     );
//   }
//   const result = await ApplicationGroup.findByIdAndDelete(id);
//   return result;
// };

export const ApplicationGroupServices = {
  createApplicationGroupIntoDB,
  getAllApplicationGroupFromDB,
  // getSingleApplicationGroupFromDB,
  // updateApplicationGroupInDB,
  // deleteApplicationGroupFromDB,
};
