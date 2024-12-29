import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TApplicationGroup } from './applicationGroup.interface';
import { ApplicationGroup } from './applicationGroup.model';
import { Application } from '../application/application.model';
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
  // Fetch application groups
  const applicationGroups = await ApplicationGroup.find({ clerkUserId, ...query }).sort({ createdAt: -1 });

  // Enhance each group with totalApplications and activeApplications counts
  const applicationGroupsWithCounts = await Promise.all(
    applicationGroups?.map(async (group) => {
      const { _id: applicationGroupId } = group;

      // Count total and active applications for the current group
      const applicationCounts = await Application.aggregate([
        { $match: { clerkUserId, applicationGroupId } }, // Match applications for this group
        {
          $facet: {
            totalApplications: [
              { $count: "count" }, // Count all applications for this group
            ],
            activeApplications: [
              { $match: { status: { $ne: "rejected" } } }, // Filter active applications
              { $count: "count" }, // Count active applications for this group
            ],
          },
        },
      ]);

      // Extract counts from the aggregation result
      const totalApplications =
        applicationCounts[0]?.totalApplications[0]?.count || 0;
      const activeApplications =
        applicationCounts[0]?.activeApplications[0]?.count || 0;

      // Return the group with counts attached
      return { ...group.toObject(), totalApplications, activeApplications };
    })
  );

  return applicationGroupsWithCounts;
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

const updateApplicationGroupInDB = async (
  clerkUserId: string,
  id: string,
  payload: Partial<TApplicationGroup>,
) => {
  const applicationGroup = await ApplicationGroup.findById(id);
  if (!applicationGroup) {
    throw new AppError(httpStatus.NOT_FOUND, 'ApplicationGroup not found');
  }
  if (applicationGroup.clerkUserId !== clerkUserId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to update this application group!',
    );
  }
  const result = await ApplicationGroup.findByIdAndUpdate(
    id,
    { ...payload },
    { new: true },
  );
  return result;
};

const deleteApplicationGroupFromDB = async (clerkUserId: string, id: string) => {
  const application = await ApplicationGroup.findById(id);
  if (!application) {
    throw new AppError(httpStatus.NOT_FOUND, 'ApplicationGroup not found');
  }
  if (application.clerkUserId !== clerkUserId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to delete this application',
    );
  }
  const result = await ApplicationGroup.findByIdAndDelete(id);
  return result;
};

export const ApplicationGroupServices = {
  createApplicationGroupIntoDB,
  getAllApplicationGroupFromDB,
  // getSingleApplicationGroupFromDB,
  updateApplicationGroupInDB,
  deleteApplicationGroupFromDB,
};
