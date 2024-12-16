/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser = {
  _id: string | Types.ObjectId;
  clerkUserId: string;
  name: string;
  email: string;
  password?: string;
  profileImage?: string;
  phoneNumber?: string;
  role: { type: string, enum: ['user', 'admin'], default: 'user' };
  isDeleted: boolean;
  isBanned: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExists(field: Record<string, unknown>): Promise<TUser & { _id: string }>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;