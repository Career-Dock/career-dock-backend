import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

/**
 * 1. Add a User ---> POST /users;
 * 2. Get all users of a company ---> GET /users;
 * 3. Get self profile ---> GET /users/me
 * 4. Update self profile ---> PATCH /users/update-me
 * 5. Delete a user ---> DELETE /users/:id
 */

router.post(
  '/',
  validateRequest(UserValidation.createUserValidationSchema),
  UserControllers.createUser,
);

router.get(
  '/',
  auth(USER_ROLE.admin),
  UserControllers.getAllUser,
);

router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.author),
  UserControllers.getMe,
);

router.patch(
  '/update-me',
  validateRequest(UserValidation.updateUserValidationSchema),
  auth(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.author),
  UserControllers.updateUser,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  UserControllers.deleteUser,
);

export const UserRoutes = router;
