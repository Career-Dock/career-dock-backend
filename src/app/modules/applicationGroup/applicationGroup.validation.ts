import { z } from 'zod';

const createApplicationGroupSchema = z.object({
  body: z.object({
    clerkUserId: z.string().optional(),
    name: z.string().min(1, 'Group name is required'),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});

const updateApplicationGroupSchema = createApplicationGroupSchema.partial();

export const ApplicationGroupValidation = {
  createApplicationGroupSchema,
  updateApplicationGroupSchema,
};
