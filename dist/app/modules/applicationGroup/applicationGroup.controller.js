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
exports.ApplicationGroupControllers = void 0;
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const http_status_1 = __importDefault(require("http-status"));
const applicationGroup_service_1 = require("./applicationGroup.service");
const createApplicationGroup = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield applicationGroup_service_1.ApplicationGroupServices.createApplicationGroupIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'ApplicationGroup registered successfully!',
        data: result,
    });
}));
// const getAllApplicationGroup = catchAsync(async (req: CustomRequest, res) => {
//   const clerkUserId = req.auth?.userId;
//   const result = await ApplicationGroupServices.getAllApplicationGroupFromDB(
//     clerkUserId!,
//     req.query,
//   );
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'All users retrieved successfully!',
//     data: result,
//   });
// });
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
// const updateApplicationGroup = catchAsync(async (req: CustomRequest, res) => {
//   const clerkUserId = req.auth?.userId;
//   const result = await ApplicationGroupServices.updateApplicationGroupInDB(
//     clerkUserId!,
//     req.params.id,
//     req.body,
//   );
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'ApplicationGroup updated successfully!',
//     data: result,
//   });
// });
// const deleteApplicationGroup = catchAsync(async (req: CustomRequest, res) => {
//   const clerkUserId = req.auth?.userId;
//   const result = await ApplicationGroupServices.deleteApplicationGroupFromDB(
//     clerkUserId!,
//     req.params.id,
//   );
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'ApplicationGroup deleted successfully!',
//     data: result,
//   });
// });
exports.ApplicationGroupControllers = {
    createApplicationGroup,
    // getAllApplicationGroup,
    // getSingleApplicationGroup,
    // updateApplicationGroup,
    // deleteApplicationGroup,
};