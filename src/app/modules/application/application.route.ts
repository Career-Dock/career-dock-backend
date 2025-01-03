import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ApplicationValidation } from './application.validation';
import { ApplicationControllers } from './application.controller';
import { clerkMiddleware } from '@clerk/express';

const router = express.Router();

/**
 * 1. Add an application ---> POST /applications;
 * 2. Get all applications of an user ---> GET /applications;
 * 3. Get single application ---> GET /applications/:id
 * 4. Update an application ---> PATCH /applications/:id
 * 5. Delete an application ---> DELETE /applications/:id
 * 6. Update application status ---> DELETE /applications/update-status/:id
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

router.patch(
  '/update-status/:id',
  clerkMiddleware(),
  validateRequest(ApplicationValidation.changeApplicationStatusSchema),
  ApplicationControllers.changeApplicationStatus,
);

export const ApplicationRoutes = router;
