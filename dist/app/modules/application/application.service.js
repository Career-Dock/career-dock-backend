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
exports.ApplicationServices = void 0;
const application_model_1 = require("./application.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const createApplicationIntoDB = (payload, clerkUserId) => __awaiter(void 0, void 0, void 0, function* () {
    const applicationData = Object.assign(Object.assign({}, payload), { clerkUserId });
    const application = yield application_model_1.Application.create(applicationData);
    return application;
});
const getAllApplicationFromDB = (clerkUserId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const initialQuery = application_model_1.Application.find({ clerkUserId });
    // Apply QueryBuilder to refine the query
    const queryBuilder = new QueryBuilder_1.default(initialQuery, query)
        .search(['jobTitle', 'companyName', 'jobRole', 'country']) // Searching specific fields
        .filter(['jobType', 'status']) // Filters on jobType, status, or any other field passed in the query
        .sort() // Sorting results based on sort query parameter or default
        .paginate() // Pagination logic for page and limit
        .fields(); // Select specific fields to include or exclude in the response
    const applications = yield queryBuilder.modelQuery;
    return { applications, count: applications === null || applications === void 0 ? void 0 : applications.length };
});
const getSingleApplicationFromDB = (clerkUserId, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield application_model_1.Application.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Application not found');
    }
    if (result.clerkUserId !== clerkUserId) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized to access this application');
    }
    return result;
});
const updateApplicationInDB = (clerkUserId, id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const application = yield application_model_1.Application.findById(id);
    if (!application) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Application not found');
    }
    if (application.clerkUserId !== clerkUserId) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized to update this application');
    }
    const result = yield application_model_1.Application.findByIdAndUpdate(id, Object.assign({}, payload), { new: true });
    return result;
});
const deleteApplicationFromDB = (clerkUserId, id) => __awaiter(void 0, void 0, void 0, function* () {
    const application = yield application_model_1.Application.findById(id);
    if (!application) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Application not found');
    }
    if (application.clerkUserId !== clerkUserId) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized to delete this application');
    }
    const result = yield application_model_1.Application.findByIdAndDelete(id);
    return result;
});
exports.ApplicationServices = {
    createApplicationIntoDB,
    getAllApplicationFromDB,
    getSingleApplicationFromDB,
    updateApplicationInDB,
    deleteApplicationFromDB,
};
