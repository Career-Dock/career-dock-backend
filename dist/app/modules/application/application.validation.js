"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationValidation = void 0;
const zod_1 = require("zod");
const interviewDetailsSchema = zod_1.z.object({
    date: zod_1.z
        .string()
        .refine((val) => !isNaN(Date.parse(val)), 'Invalid date format')
        .optional(),
    time: zod_1.z
        .string()
        .regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:MM expected)')
        .optional(),
    location: zod_1.z.string().min(1, 'Location is required').optional(),
});
const createApplicationSchema = zod_1.z.object({
    body: zod_1.z.object({
        applicationGroupId: zod_1.z.string(),
        jobTitle: zod_1.z.string().min(1, 'Job title is required'),
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
            'Interview_Scheduled',
            'Rejected',
            'Under_Review',
            'Task_Received',
            'Task_Ongoing',
            'Task_Submitted',
            'Offer_Received',
            'Offer_Accepted',
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
