"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const application_route_1 = require("../modules/application/application.route");
const applicationGroup_route_1 = require("../modules/applicationGroup/applicationGroup.route");
const seed_routes_1 = require("../modules/seed/seed.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/seed',
        route: seed_routes_1.SeedRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/applications',
        route: application_route_1.ApplicationRoutes,
    },
    {
        path: '/application-groups',
        route: applicationGroup_route_1.ApplicationGroupRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
