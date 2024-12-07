/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser = {
  username: string;
  email: string;
  password: string;
  role: { type: string, enum: ['user', 'author'], default: 'user' };
  firstName: string;
  lastName: string;
  profilePicture?: string;
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