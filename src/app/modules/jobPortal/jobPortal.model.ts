import { model, Schema } from "mongoose";
import { TJobPortal } from "./jobPortal.interface";

const jobPortalSchema = new Schema<TJobPortal>(
  {
    clerkUserId: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ['website', 'fb-group', 'linked-in-group'] },
    tags: {
      type: [String],
      default: [],
    }
  },
  { timestamps: true }
);

export const JobPortal = model<TJobPortal>('JobPortal', jobPortalSchema);