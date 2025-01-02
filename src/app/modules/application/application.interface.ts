import { Types } from 'mongoose';

export type TInterviewDetails = {
  date?: string;
  time?: string;
  location?: string;
};

export type TApplication = {
  _id?: string;
  clerkUserId: string;
  applicationGroupId?: string | Types.ObjectId;
  jobTitle: string;
  jobDescription?: string;
  appliedVia?: string;
  country?: string;
  companyName?: string;
  companyEmail?: string;
  companyWebsite?: string;
  companyPhoneNumber?: string;
  jobPortal?: string;
  address?: string;
  jobType: 'remote' | 'onsite' | 'hybrid';
  status:
    | 'Applied'
    | 'Rejected'
    | 'Under_Review'
    | 'Task_Received'
    | 'Task_Ongoing'
    | 'Task_Submitted'
    | 'Interview_Scheduled'
    | 'Offer_Received'
    | 'Offer_Accepted'
    | string;
  appliedDate?: Date;
  interviewDetails?: TInterviewDetails;
  notes?: string;
  jobPostingURL?: string;
  resumeURL?: string;
  salaryRange?: string;
};
