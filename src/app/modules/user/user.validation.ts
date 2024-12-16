import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    clerkUserId: z.string(),
    email: z.string().email(),
    role: z.string().optional(),
    profileImage: z.string().optional(),
    phoneNumber: z.string().optional(),
  })
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    profileImage: z.string().optional(),
    phoneNumber: z.string().optional(),
  })
});

const updateUserAccessSchema = z.object({
  body: z.object({
    isBlocked: z.boolean().optional(),
    isDeleted: z.boolean().optional(),
  })
})

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
  updateUserAccessSchema,
};