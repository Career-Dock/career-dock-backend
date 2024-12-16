import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './user.interface';
const userSchema = new Schema<TUser, UserModel>(
  {
    clerkUserId: {
      type: String,
      required: [true, 'Clerk userId is required!'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required!'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: true,
    },
    password: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// userSchema.pre('save', async function (next) {
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   // hashing password and save into DB
//   this.password = await bcrypt.hash(
//     this.password,
//     Number(config.bcrypt_salt_rounds),
//   );
//   next();
// });

// set '' after saving password
// userSchema.post('save', function (doc, next) {
//   doc.password = '';
//   next();
// });
userSchema.statics.isUserExists = async function (field: Record<string, unknown>) {
  return await User.findOne(field).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);
