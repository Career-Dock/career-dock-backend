import { z } from 'zod';

const createApplicationGroupSchema = z.object({
  body: z.object({
    clerkUserId: z.string().min(1, 'User ID is required').optional(),
    name: z.string().min(1, 'Group name is required'),
    description: z.string().min(1, 'Group description is required').optional(),
    image: z.string().min(1, 'Group image is required').optional(),
  }),
});

const updateApplicationSchema = createApplicationGroupSchema.partial();

export const ApplicationGroupValidation = {
  createApplicationGroupSchema,
  updateApplicationSchema,
};
