import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

/**
 * 1. Login user ---> POST /users;
 */

router.post(
  '/login',
  // validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
);

export const AuthRoutes = router;
