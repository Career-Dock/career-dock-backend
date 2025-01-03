import { z } from 'zod';

const createJobPortalSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Job portal name is required!"),
    url: z.string().url('Invalid URL'),
    description: z.string().optional(),
    tags: z.array(z.string().min(1, 'Please add a string!')).optional(),
    type: z.enum(['website', 'fb-group', 'linked-in-group']).optional()
  }),
});

const updateJobPortalSchema = createJobPortalSchema.partial();

export const JobPortalValidation = {
  createJobPortalSchema,
  updateJobPortalSchema
};
