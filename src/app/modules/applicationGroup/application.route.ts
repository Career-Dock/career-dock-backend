import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ApplicationGroupValidation } from './applicationGroup.validation';
import { ApplicationGroupControllers } from './applicationGroup.controller';
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
  validateRequest(ApplicationGroupValidation.createApplicationGroupSchema),
  ApplicationGroupControllers.createApplicationGroup,
);

// router.get('/', clerkMiddleware(), ApplicationGroupControllers.getAllApplicationGroup);

// router.get(
//   '/:id',
//   clerkMiddleware(),
//   ApplicationGroupControllers.getSingleApplicationGroup,
// );

// router.patch(
//   '/:id',
//   clerkMiddleware(),
//   validateRequest(ApplicationGroupValidation.updateApplicationGroupSchema),
//   ApplicationGroupControllers.updateApplicationGroup,
// );

// router.delete(
//   '/:id',
//   clerkMiddleware(),
//   ApplicationGroupControllers.deleteApplicationGroup,
// );

export const ApplicationGroupRoutes = router;
