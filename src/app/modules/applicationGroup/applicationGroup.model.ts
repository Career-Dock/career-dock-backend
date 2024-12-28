import { model, Schema } from 'mongoose';
import { TApplicationGroup } from './applicationGroup.interface';

const ApplicationGroupSchema = new Schema<TApplicationGroup>(
  {
    name: { type: String, required: true },
    description: { type: String },
    clerkUserId: { type: String, required: true },
    image: { type: String },
  },
  {
    timestamps: true,
  },
);

export const ApplicationGroup = model<TApplicationGroup>(
  'ApplicationGroup',
  ApplicationGroupSchema,
);
