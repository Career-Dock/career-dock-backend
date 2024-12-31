"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationGroup = void 0;
const mongoose_1 = require("mongoose");
const ApplicationGroupSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String },
    clerkUserId: { type: String, required: true },
    image: { type: String },
}, {
    timestamps: true,
});
exports.ApplicationGroup = (0, mongoose_1.model)('ApplicationGroup', ApplicationGroupSchema);
