import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../config';
import { TUser, UserModel } from './user.interface';
const userSchema = new Schema<TUser, UserModel>(
  {
    username: {
      type: String,
      required: [true, 'Username is required!'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required!'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required!'],
    },
    role: {
      type: String,
      enum: ['user', 'author'],
      default: 'user',
    },
    firstName: {
      type: String,
      required: [true, 'First name is required!'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required!'],
    },
    profilePicture: {
      type: String,
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

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  // hashing password and save into DB
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
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
