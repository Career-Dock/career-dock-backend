"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        clerkUserId: zod_1.z.string(),
        email: zod_1.z.string().email(),
        role: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
        phoneNumber: zod_1.z.string().optional(),
    })
});
const updateUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        profileImage: zod_1.z.string().optional(),
        phoneNumber: zod_1.z.string().optional(),
    })
});
const updateUserAccessSchema = zod_1.z.object({
    body: zod_1.z.object({
        isBlocked: zod_1.z.boolean().optional(),
        isDeleted: zod_1.z.boolean().optional(),
    })
});
exports.UserValidation = {
    createUserValidationSchema,
    updateUserValidationSchema,
    updateUserAccessSchema,
};
