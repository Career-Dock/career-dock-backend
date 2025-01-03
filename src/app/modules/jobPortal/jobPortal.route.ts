import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { JobPortalValidation } from './jobPortal.validation';
import { clerkMiddleware } from '@clerk/express';
import { JobPortalControllers } from './jobPortal.controller';

const router = express.Router();

/**
 * 1. Add a JobPortal ---> POST /job-portals;
 * 2. Get all JobPortal shares of a user ---> GET /job-portals;
 * 3. Get single JobPortal share ---> GET /job-portals/:id
 * 4. Update single JobPortal share ---> PATCH /job-portals/update-me
 * 5. Delete an JobPortal share ---> DELETE /job-portals/:id
 */

router.post(
  '/',
  clerkMiddleware(),
  validateRequest(JobPortalValidation.createJobPortalSchema),
  JobPortalControllers.createJobPortal,
);

router.get('/', clerkMiddleware(), JobPortalControllers.getAllJobPortal);

router.get(
  '/:id',
  clerkMiddleware(),
  JobPortalControllers.getSingleJobPortal,
);

router.patch(
  '/:id',
  clerkMiddleware(),
  validateRequest(JobPortalValidation.updateJobPortalSchema),
  JobPortalControllers.updateJobPortal,
);

router.delete(
  '/:id',
  clerkMiddleware(),
  JobPortalControllers.deleteJobPortal,
);

export const JobPortalRoutes = router;
