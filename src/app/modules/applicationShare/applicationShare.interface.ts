export type TApplicationShare = {
  _id: string;
  clerkUserId: string;
  query: {
    searchTerm?: string;
    limit?: number;
    page?: number;
    sort?: string;
    fields?: string;
    //filters
    dateRange?: string;
    jobType?: string;
    status?: string;
    applicationGroupId?: string;
    resumeURL?: string;
    salaryRange?: string;
    jobPortal?: string;
    appliedVia?: string;
    country?: string;
    companyName?: string;
    companyEmail?: string;
    companyWebsite?: string;
    companyPhoneNumber?: string;
  };
  isPaused?: boolean;
  createdAt: Date;
  updatedAt: Date;
};
