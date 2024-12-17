import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { ApplicationRoutes } from '../modules/application/application.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
