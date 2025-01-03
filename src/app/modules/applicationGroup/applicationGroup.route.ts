import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ApplicationGroupValidation } from './applicationGroup.validation';
import { ApplicationGroupControllers } from './applicationGroup.controller';
import { clerkMiddleware } from '@clerk/express';

const router = express.Router();

/**
 * Application Group often named as Application Board in frontend 😄
 * 1. Add an application group ---> POST /application-groups;
 * 2. Get all application groups of an user ---> GET /application-groups;
 * 3. Get single application group ---> GET /application-groups/:id
 * 4. Update single application group ---> PATCH /application-groups/:id
 * 5. Delete an application group ---> DELETE /application-groups/:id
 */

router.post(
  '/',
  clerkMiddleware(),
  validateRequest(ApplicationGroupValidation.createApplicationGroupSchema),
  ApplicationGroupControllers.createApplicationGroup,
);

router.get('/', clerkMiddleware(), ApplicationGroupControllers.getAllApplicationGroup);

router.get(
  '/:id',
  clerkMiddleware(),
  ApplicationGroupControllers.getSingleApplicationGroup,
);

router.patch(
  '/:id',
  clerkMiddleware(),
  validateRequest(ApplicationGroupValidation.updateApplicationGroupSchema),
  ApplicationGroupControllers.updateApplicationGroup,
);

router.delete(
  '/:id',
  clerkMiddleware(),
  ApplicationGroupControllers.deleteApplicationGroup,
);

export const ApplicationGroupRoutes = router;
