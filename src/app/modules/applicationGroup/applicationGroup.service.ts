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
  const allApplications = await Application.find({ clerkUserId, ...query }).sort({ createdAt: -1 });
  const allActiveApplications = await Application.find({ clerkUserId, status: { $ne: 'Rejected' } }).sort({ createdAt: -1 });

  // Enhance each group with totalApplications and activeApplications counts
  // const applicationGroupsWithCounts = await Promise.all(
  //   applicationGroups?.map(async (group) => {
  //     const { _id: applicationGroupId } = group;

  //     // Count total and active applications for the current group
  //     const applicationCounts = await Application.aggregate([
  //       { $match: { clerkUserId, applicationGroupId } }, // Match applications for this group
  //       {
  //         $facet: {
  //           totalApplications: [
  //             { $count: "count" }, // Count all applications for this group
  //           ],
  //           activeApplications: [
  //             { $match: { status: { $ne: "rejected" } } }, // Filter active applications
  //             { $count: "count" }, // Count active applications for this group
  //           ],
  //         },
  //       },
  //     ]);

  //     // Extract counts from the aggregation result
  //     const totalApplications =
  //       applicationCounts[0]?.totalApplications[0]?.count || 0;
  //     const activeApplications =
  //       applicationCounts[0]?.activeApplications[0]?.count || 0;

  //     // Return the group with counts attached
  //     return { ...group.toObject(), totalApplications, activeApplications };
  //   })
  // );

  // return applicationGroupsWithCounts;
  // Fetch application groups with aggregated stats using MongoDB aggregation pipeline
  const applicationGroups = await ApplicationGroup.aggregate([
    // Match application groups for the specific user
    {
      $match: {
        clerkUserId: clerkUserId.toString(),
      },
    },
    // Lookup applications for each group
    {
      $lookup: {
        from: 'applications', // MongoDB collection name (lowercase)
        let: { groupId: { $toString: '$_id' } },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$applicationGroupId', '$$groupId'],
              },
            },
          },
          {
            $facet: {
              // Count total applications
              totalApplications: [
                {
                  $count: 'count',
                },
              ],
              // Count active applications (not rejected)
              activeApplications: [
                {
                  $match: {
                    status: { $ne: 'Rejected' },
                  },
                },
                {
                  $count: 'count',
                },
              ],
            },
          },
        ],
        as: 'stats',
      },
    },
    // Transform the stats array into single objects with default values
    {
      $addFields: {
        stats: { $arrayElemAt: ['$stats', 0] },
      },
    },
    // Add computed fields with proper default values
    {
      $addFields: {
        totalApplications: {
          $ifNull: [
            { $arrayElemAt: ['$stats.totalApplications.count', 0] },
            0,
          ],
        },
        activeApplications: {
          $ifNull: [
            { $arrayElemAt: ['$stats.activeApplications.count', 0] },
            0,
          ],
        },
      },
    },
    // Remove the stats field from final output
    {
      $project: {
        stats: 0,
      },
    },
  ]);
  return {applicationGroups, allApplicationsCount: allApplications?.length, allActiveApplicationsCount: allActiveApplications?.length};
};

const getSingleApplicationGroupFromDB = async (clerkUserId: string, id: string) => {
  const result = await ApplicationGroup.findById(id);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'ApplicationGroup not found');
  }
  if (result.clerkUserId !== clerkUserId) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You are not authorized to access this application board',
    );
  }
  return result;
};

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
  getSingleApplicationGroupFromDB,
  updateApplicationGroupInDB,
  deleteApplicationGroupFromDB,
};
