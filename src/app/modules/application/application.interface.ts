export type TInterviewDetails = {
    date: string; 
    time: string;
    location: string;
  }
  
  export type TApplication = {
    _id?: string;
    jobTitle: string;
    jobRole: string;
    companyName?: string;
    companyEmail?: string;
    companyWebsite?: string;
    companyPhoneNumber?: string;
    jobPortal?: string;
    address?: string;
    jobType: "remote" | "onsite" | "hybrid";
    status: "Applied" | "Interview Scheduled" | "Rejected" | "Under Review" | string;
    appliedDate?: Date;
    interviewDetails?: TInterviewDetails;
    notes?: string;
    jobPostingURL?: string;
    resumeURL?: string;
    salaryRange?: string;
  }
  