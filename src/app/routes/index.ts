import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { ApplicationRoutes } from '../modules/application/application.route';
import { ApplicationGroupRoutes } from '../modules/applicationGroup/applicationGroup.route';
import { SeedRoutes } from '../modules/seed/seed.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/seed',
    route: SeedRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/applications',
    route: ApplicationRoutes,
  },
  {
    path: '/application-groups',
    route: ApplicationGroupRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
