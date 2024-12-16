import { JwtPayload } from 'jsonwebtoken';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: Partial<TUser>) => {
  const userData = { ...payload };
  const { name, email, role } = await User.create(userData);
  return { name, email, role };
};

const getAllUserFromDB = async (query: Record<string, unknown>) => {
  const result = await User.find({ ...query }).select("name email role");
  return result;
};

const getMeFromDB = async (id: string) => {
  const result = await User.findById(id).select("name email role profileImage phoneNumber");
  return result;
};

const updateUserInDB = async (user: (JwtPayload & { role: string; }) | undefined, payload: Partial<TUser>) => {
  const result = await User.findOneAndUpdate({ _id: user?._id }, { ...payload }, { new: true }).select("name email role");
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getMeFromDB,
  updateUserInDB,
  deleteUserFromDB
};
