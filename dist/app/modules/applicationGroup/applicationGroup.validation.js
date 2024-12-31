"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationGroupValidation = void 0;
const zod_1 = require("zod");
const createApplicationGroupSchema = zod_1.z.object({
    body: zod_1.z.object({
        clerkUserId: zod_1.z.string().optional(),
        name: zod_1.z.string().min(1, 'Group name is required'),
        description: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
    }),
});
const updateApplicationGroupSchema = createApplicationGroupSchema.partial();
exports.ApplicationGroupValidation = {
    createApplicationGroupSchema,
    updateApplicationGroupSchema,
};
