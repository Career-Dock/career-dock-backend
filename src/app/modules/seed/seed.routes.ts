import express from 'express';
import { SeedControllers } from './seed.controller';

const router = express.Router();

router.post(
  '/seed-applications',
  SeedControllers.seedApplications
);

export const SeedRoutes = router;
