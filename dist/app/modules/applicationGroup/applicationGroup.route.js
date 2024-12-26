"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationGroupRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const applicationGroup_validation_1 = require("./applicationGroup.validation");
const applicationGroup_controller_1 = require("./applicationGroup.controller");
const express_2 = require("@clerk/express");
const router = express_1.default.Router();
/**
 * 1. Add a User ---> POST /users;
 * 2. Get all users of a company ---> GET /users;
 * 3. Get self profile ---> GET /users/me
 * 4. Update self profile ---> PATCH /users/update-me
 * 5. Delete a user ---> DELETE /users/:id
 */
router.post('/', (0, express_2.clerkMiddleware)(), (0, validateRequest_1.default)(applicationGroup_validation_1.ApplicationGroupValidation.createApplicationGroupSchema), applicationGroup_controller_1.ApplicationGroupControllers.createApplicationGroup);
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
exports.ApplicationGroupRoutes = router;
