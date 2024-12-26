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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationGroupServices = void 0;
const applicationGroup_model_1 = require("./applicationGroup.model");
// import AppError from '../../errors/AppError';
// import httpStatus from 'http-status';
const createApplicationGroupIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const applicationData = Object.assign({}, payload);
    const application = yield applicationGroup_model_1.ApplicationGroup.create(applicationData);
    return application;
});
// const getAllApplicationGroupFromDB = async (
//   clerkUserId: string,
//   query: Record<string, unknown>,
// ) => {
//   const result = await ApplicationGroup.find({ clerkUserId, ...query });
//   return result;
// };
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
exports.ApplicationGroupServices = {
    createApplicationGroupIntoDB,
    // getAllApplicationGroupFromDB,
    // getSingleApplicationGroupFromDB,
    // updateApplicationGroupInDB,
    // deleteApplicationGroupFromDB,
};
