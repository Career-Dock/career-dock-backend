"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const mongoose_1 = require("mongoose");
const InterviewDetailsSchema = new mongoose_1.Schema({
    date: { type: String },
    time: { type: String },
    location: { type: String },
});
const ApplicationSchema = new mongoose_1.Schema({
    clerkUserId: { type: String, required: false },
    applicationGroupId: { type: String, required: true },
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    country: { type: String, required: true },
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
        enum: [
            'Applied',
            'Interview_Scheduled',
            'Rejected',
            'Under_Review',
            'Task_Received',
            'Task_Ongoing',
            'Task_Submitted',
            'Offer_Received',
            'Offer_Accepted',
        ],
        required: true,
    },
    appliedDate: { type: Date, default: new Date() },
    interviewDetails: { type: InterviewDetailsSchema, required: false },
    notes: { type: String },
    jobPostingURL: { type: String },
    resumeURL: { type: String },
    salaryRange: { type: String },
}, {
    timestamps: true,
});
exports.Application = (0, mongoose_1.model)('Application', ApplicationSchema);
