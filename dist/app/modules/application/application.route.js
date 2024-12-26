"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const application_validation_1 = require("./application.validation");
const application_controller_1 = require("./application.controller");
const express_2 = require("@clerk/express");
const router = express_1.default.Router();
/**
 * 1. Add a User ---> POST /users;
 * 2. Get all users of a company ---> GET /users;
 * 3. Get self profile ---> GET /users/me
 * 4. Update self profile ---> PATCH /users/update-me
 * 5. Delete a user ---> DELETE /users/:id
 */
router.post('/', (0, express_2.clerkMiddleware)(), (0, validateRequest_1.default)(application_validation_1.ApplicationValidation.createApplicationSchema), application_controller_1.ApplicationControllers.createApplication);
router.get('/', (0, express_2.clerkMiddleware)(), application_controller_1.ApplicationControllers.getAllApplication);
router.get('/:id', (0, express_2.clerkMiddleware)(), application_controller_1.ApplicationControllers.getSingleApplication);
router.patch('/:id', (0, express_2.clerkMiddleware)(), (0, validateRequest_1.default)(application_validation_1.ApplicationValidation.updateApplicationSchema), application_controller_1.ApplicationControllers.updateApplication);
router.delete('/:id', (0, express_2.clerkMiddleware)(), application_controller_1.ApplicationControllers.deleteApplication);
exports.ApplicationRoutes = router;
