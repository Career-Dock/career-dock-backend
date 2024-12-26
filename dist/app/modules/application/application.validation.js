"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationValidation = void 0;
const zod_1 = require("zod");
const interviewDetailsSchema = zod_1.z.object({
    date: zod_1.z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), 'Invalid date format'),
    time: zod_1.z
        .string()
        .regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:MM expected)'),
    location: zod_1.z.string().min(1, 'Location is required'),
});
const createApplicationSchema = zod_1.z.object({
    body: zod_1.z.object({
        clerkUserId: zod_1.z.string().min(1, 'User ID is required'),
        applicationGroupId: zod_1.z.string().optional(),
        jobTitle: zod_1.z.string().min(1, 'Job title is required'),
        jobRole: zod_1.z.string().min(1, 'Job role is required'),
        companyName: zod_1.z.string().min(1, 'Company name is required').optional(),
        companyEmail: zod_1.z.string().email('Invalid email address').optional(),
        companyWebsite: zod_1.z.string().min(1, 'Phone number is required').optional(),
        companyPhoneNumber: zod_1.z
            .string()
            .min(1, 'Phone number is required')
            .optional(),
        jobPortal: zod_1.z.string().min(1, 'Job portal is required').optional(),
        address: zod_1.z.string().min(1, 'Address is required').optional(),
        jobType: zod_1.z.enum(['remote', 'onsite', 'hybrid']),
        status: zod_1.z.enum([
            'Applied',
            'Interview Scheduled',
            'Rejected',
            'Under Review',
        ]),
        appliedDate: zod_1.z
            .string()
            .refine((val) => !isNaN(Date.parse(val)), 'Invalid date format')
            .optional(),
        interviewDetails: interviewDetailsSchema.optional(),
        notes: zod_1.z.string().optional(),
        jobPostingURL: zod_1.z.string().url('Invalid URL').optional(),
        resumeURL: zod_1.z.string().url('Invalid URL').optional(),
        salaryRange: zod_1.z.string().optional(),
    }),
});
const updateApplicationSchema = createApplicationSchema.partial();
exports.ApplicationValidation = {
    createApplicationSchema,
    updateApplicationSchema,
};
