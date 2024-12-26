import { z } from 'zod';

const createApplicationGroupSchema = z.object({
  body: z.object({
    userId: z.string().min(1, 'User ID is required'),
    name: z.string().min(1, 'Group name is required'),
    description: z.string().min(1, 'Group description is required').optional(),
  }),
});

const updateApplicationSchema = createApplicationGroupSchema.partial();

export const ApplicationGroupValidation = {
  createApplicationGroupSchema,
  updateApplicationSchema,
};
