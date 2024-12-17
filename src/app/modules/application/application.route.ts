import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ApplicationValidation } from './application.validation';
import { ApplicationControllers } from './application.controller';
import { clerkMiddleware } from '@clerk/express';

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
  clerkMiddleware(),
  validateRequest(ApplicationValidation.createApplicationSchema),
  ApplicationControllers.createApplication,
);

router.get('/', clerkMiddleware(), ApplicationControllers.getAllApplication);

router.get(
  '/:id',
  clerkMiddleware(),
  ApplicationControllers.getSingleApplication,
);

router.patch(
  '/:id',
  clerkMiddleware(),
  validateRequest(ApplicationValidation.updateApplicationSchema),
  ApplicationControllers.updateApplication,
);

router.delete(
  '/:id',
  clerkMiddleware(),
  ApplicationControllers.deleteApplication,
);

export const ApplicationRoutes = router;
