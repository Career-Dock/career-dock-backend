import { z } from 'zod';

const createApplicationShareValidationSchema = z.object({
  body: z.object({
    query: z.object({
      searchTerm: z.string().optional(),
      limit: z.number().int().positive().optional(),
      page: z.number().int().positive().optional(),
      sort: z.string().optional(),
      fields: z.string().optional(),
      dateRange: z.string().optional(),
      jobType: z.string().optional(),
      status: z.string().optional(),
      applicationGroupId: z.string().optional(),
      resumeURL: z.string().url("Invalid URL format").optional(),
      salaryRange: z.string().optional(),
      jobPortal: z.string().optional(),
      appliedVia: z.string().optional(),
      country: z.string().optional(),
      companyName: z.string().optional(),
      companyEmail: z.string().email("Invalid email format").optional(),
      companyWebsite: z.string().url("Invalid URL format").optional(),
      companyPhoneNumber: z.string().optional(),
    }),
    isPaused: z.boolean().optional()
  }),
});

const updateApplicationShareSchema = createApplicationShareValidationSchema.partial();

const pauseApplicationShareValidationSchema = z.object({
  body: z.object({
    isPaused: z.boolean()
  }),
});

export const ApplicationShareValidation = {
  createApplicationShareValidationSchema,
  updateApplicationShareSchema,
  pauseApplicationShareValidationSchema
};
