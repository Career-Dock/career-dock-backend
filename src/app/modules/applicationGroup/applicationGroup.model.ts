import { model, Schema } from 'mongoose';
import { TApplicationGroup } from './applicationGroup.interface';

const ApplicationGroupSchema = new Schema<TApplicationGroup>(
  {
    name: { type: String, required: true },
    description: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true,
  },
);

export const ApplicationGroup = model<TApplicationGroup>(
  'ApplicationGroup',
  ApplicationGroupSchema,
);
