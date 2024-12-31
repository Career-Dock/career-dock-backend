import { model, Schema } from 'mongoose';
import { TApplication, TInterviewDetails } from './application.interface';

const InterviewDetailsSchema: Schema<TInterviewDetails> = new Schema({
  date: { type: String, required: true },
  time: { type: String },
  location: { type: String },
});

const ApplicationSchema = new Schema<TApplication>(
  {
    clerkUserId: { type: String, required: false },
    applicationGroupId: { type: String, required: true },
    jobTitle: { type: String, required: true },
    jobRole: { type: String, required: true },
    companyName: { type: String },
    country: { type: String },
    appliedVia: { type: String },
    companyEmail: { type: String },
    companyWebsite: { type: String },
    companyPhoneNumber: { type: String },
    jobPortal: { type: String },
    address: { type: String },
    jobType: {
      type: String,
      enum: ['remote', 'onsite', 'hybrid'],
      required: true,
    },
    status: {
      type: String,
      enum: ['Applied', 'Interview_Scheduled', 'Rejected', 'Under_Review', 'Task_Received', 'Task_Ongoing', 'Task_Submitted', 'Offer_Received', 'Offer_Accepted'],
      required: true,
    },
    appliedDate: { type: Date, default: new Date() },
    interviewDetails: { type: InterviewDetailsSchema },
    notes: { type: String },
    jobPostingURL: { type: String },
    resumeURL: { type: String },
    salaryRange: { type: String },
  },
  {
    timestamps: true,
  },
);

export const Application = model<TApplication>(
  'Application',
  ApplicationSchema,
);
