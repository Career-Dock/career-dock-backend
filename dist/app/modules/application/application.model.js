"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const mongoose_1 = require("mongoose");
const InterviewDetailsSchema = new mongoose_1.Schema({
    date: { type: String, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
});
const ApplicationSchema = new mongoose_1.Schema({
    clerkUserId: { type: String, required: true },
    applicationGroupId: { type: String },
    jobTitle: { type: String, required: true },
    jobRole: { type: String, required: true },
    companyName: { type: String },
    country: { type: String },
    appliedVia: { type: String },
    companyEmail: { type: String },
    companyWebsite: { type: String },
    companyPhoneNumber: { type: String },
    jobPortal: { type: String },
    address: { type: String },
    jobType: {
        type: String,
        enum: ['remote', 'onsite', 'hybrid'],
        required: true,
    },
    status: {
        type: String,
        enum: ['Applied', 'Interview Scheduled', 'Rejected', 'Under Review'],
        required: true,
    },
    appliedDate: { type: Date, default: new Date() },
    interviewDetails: { type: InterviewDetailsSchema },
    notes: { type: String },
    jobPostingURL: { type: String },
    resumeURL: { type: String },
    salaryRange: { type: String },
}, {
    timestamps: true,
});
exports.Application = (0, mongoose_1.model)('Application', ApplicationSchema);
