import { model, Schema } from "mongoose";
import { TApplicationShare } from "./applicationShare.interface";

const ApplicationShareSchema = new Schema<TApplicationShare>(
  {
    clerkUserId: { type: String, required: true },
    applicationGroupName: { type: String, default: "All Applications" },
    query: {
      searchTerm: { type: String },
      limit: { type: Number },
      page: { type: Number },
      sort: { type: String },
      fields: { type: String },
      dateRange: { type: String },
      jobType: { type: String },
      status: { type: String },
      applicationGroupId: { type: String },
      resumeURL: { type: String },
      salaryRange: { type: String },
      jobPortal: { type: String },
      appliedVia: { type: String },
      country: { type: String },
      companyName: { type: String },
      companyEmail: { type: String },
      companyWebsite: { type: String },
      companyPhoneNumber: { type: String },
    },
    isPaused: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const ApplicationShare = model<TApplicationShare>('ApplicationShare', ApplicationShareSchema);