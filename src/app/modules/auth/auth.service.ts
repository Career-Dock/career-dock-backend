import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExists({ email: payload?.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password || '')))
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not matched');

  //create token and sent to the  client

  const jwtPayload = {
    email: user.email,
    role: user.role,
    _id: user._id,
  };
  // console.log(jwtPayload);
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  loginUser,
};
