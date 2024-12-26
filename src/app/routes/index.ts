import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { ApplicationRoutes } from '../modules/application/application.route';
import { ApplicationGroupRoutes } from '../modules/applicationGroup/applicationGroup.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/applications',
    route: ApplicationRoutes,
  },
  {
    path: '/application-group',
    route: ApplicationGroupRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
