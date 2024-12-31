import { z } from 'zod';

const interviewDetailsSchema = z.object({
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), 'Invalid date format')
    .optional(),
  time: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:MM expected)')
    .optional(),
  location: z.string().min(1, 'Location is required').optional(),
});

const createApplicationSchema = z.object({
  body: z.object({
    applicationGroupId: z.string(),
    jobTitle: z.string().min(1, 'Job title is required'),
    companyName: z.string().min(1, 'Company name is required').optional(),
    companyEmail: z.string().email('Invalid email address').optional(),
    companyWebsite: z.string().min(1, 'Phone number is required').optional(),
    companyPhoneNumber: z
      .string()
      .min(1, 'Phone number is required')
      .optional(),
    jobPortal: z.string().min(1, 'Job portal is required').optional(),
    address: z.string().min(1, 'Address is required').optional(),
    jobType: z.enum(['remote', 'onsite', 'hybrid']),
    status: z.enum([
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
    appliedDate: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), 'Invalid date format')
      .optional(),
    interviewDetails: interviewDetailsSchema.optional(),
    notes: z.string().optional(),
    jobPostingURL: z.string().url('Invalid URL').optional(),
    resumeURL: z.string().url('Invalid URL').optional(),
    salaryRange: z.string().optional(),
  }),
});

const updateApplicationSchema = createApplicationSchema.partial();

export const ApplicationValidation = {
  createApplicationSchema,
  updateApplicationSchema,
};
