import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ApplicationShareValidation } from './applicationShare.validation';
import { ApplicationShareControllers } from './applicationShare.controller';
import { clerkMiddleware } from '@clerk/express';

const router = express.Router();

/**
 * 1. Add an application share ---> POST /application-shares;
 * 2. Get all application shares of a user ---> GET /application-shares;
 * 3. Get all applications of a single share of a user ---> GET /get-all-applications/:shareId';
 * 4. Get single application share ---> GET /application-shares/:id
 * 5. Update single application share ---> PATCH /application-shares/update-me
 * 6. Delete an application share ---> DELETE /application-shares/:id
 * 7. Pause/Resume an application share ---> PATCH /pause-application/:id'
 */

router.post(
  '/',
  clerkMiddleware(),
  validateRequest(ApplicationShareValidation.createApplicationShareValidationSchema),
  ApplicationShareControllers.createApplicationShare,
);

router.get('/', clerkMiddleware(), ApplicationShareControllers.getAllApplicationShare);

router.get('/get-all-applications/:shareId', clerkMiddleware(), ApplicationShareControllers.getAllApplicationOfThiShare);

router.get(
  '/:id',
  clerkMiddleware(),
  ApplicationShareControllers.getSingleApplicationShare,
);

router.patch(
  '/:id',
  clerkMiddleware(),
  validateRequest(ApplicationShareValidation.updateApplicationShareSchema),
  ApplicationShareControllers.updateApplicationShare,
);

router.patch(
  '/pause-application/:id',
  clerkMiddleware(),
  validateRequest(ApplicationShareValidation.pauseApplicationShareValidationSchema),
  ApplicationShareControllers.pauseApplicationShare,
);

router.delete(
  '/:id',
  clerkMiddleware(),
  ApplicationShareControllers.deleteApplicationShare,
);

export const ApplicationShareRoutes = router;
