import { Types } from 'mongoose';

export type TApplicationGroup = {
  _id: string;
  name: string; // e.g., "Web Developer Applications" or "ML Engineer applications"
  description?: string; // Optional: Brief details about the group
  clerkUserId: string | Types.ObjectId; // Reference to the user who owns/created this group
  image?: string; // Optional: URL of the image representing the group
  createdAt: Date;
  updatedAt: Date;
};
