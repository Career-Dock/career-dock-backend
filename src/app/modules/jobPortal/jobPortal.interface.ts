export type TJobPortal = {
  _id: string;
  clerkUserId: string;
  name: string;
  url: string;
  description?: string;
  type: 'website' | 'fb-group' | 'linked-in-group';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};
