"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationGroupServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const applicationGroup_model_1 = require("./applicationGroup.model");
const application_model_1 = require("../application/application.model");
// import AppError from '../../errors/AppError';
// import httpStatus from 'http-status';
const createApplicationGroupIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const applicationData = Object.assign({}, payload);
    if (!applicationData.clerkUserId) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized to create this application group');
    }
    const application = yield applicationGroup_model_1.ApplicationGroup.create(applicationData);
    return application;
});
const getAllApplicationGroupFromDB = (clerkUserId, query) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch application groups
    const allApplications = yield application_model_1.Application.find(Object.assign({ clerkUserId }, query)).sort({ createdAt: -1 });
    const allActiveApplications = yield application_model_1.Application.find({ clerkUserId, status: { $ne: 'Rejected' } }).sort({ createdAt: -1 });
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
    const applicationGroups = yield applicationGroup_model_1.ApplicationGroup.aggregate([
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
    return { applicationGroups, allApplicationsCount: allApplications === null || allApplications === void 0 ? void 0 : allApplications.length, allActiveApplicationsCount: allActiveApplications === null || allActiveApplications === void 0 ? void 0 : allActiveApplications.length };
});
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
const updateApplicationGroupInDB = (clerkUserId, id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const applicationGroup = yield applicationGroup_model_1.ApplicationGroup.findById(id);
    if (!applicationGroup) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'ApplicationGroup not found');
    }
    if (applicationGroup.clerkUserId !== clerkUserId) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized to update this application group!');
    }
    const result = yield applicationGroup_model_1.ApplicationGroup.findByIdAndUpdate(id, Object.assign({}, payload), { new: true });
    return result;
});
const deleteApplicationGroupFromDB = (clerkUserId, id) => __awaiter(void 0, void 0, void 0, function* () {
    const application = yield applicationGroup_model_1.ApplicationGroup.findById(id);
    if (!application) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'ApplicationGroup not found');
    }
    if (application.clerkUserId !== clerkUserId) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized to delete this application');
    }
    const result = yield applicationGroup_model_1.ApplicationGroup.findByIdAndDelete(id);
    return result;
});
exports.ApplicationGroupServices = {
    createApplicationGroupIntoDB,
    getAllApplicationGroupFromDB,
    // getSingleApplicationGroupFromDB,
    updateApplicationGroupInDB,
    deleteApplicationGroupFromDB,
};
