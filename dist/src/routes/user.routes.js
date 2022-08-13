"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const middleware_1 = require("../middleware");
const user_schema_1 = require("../schema/user.schema");
function default_1() {
    const router = (0, express_1.Router)();
    // create user
    router.post("/api/user/create", (0, middleware_1.validateRequest)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
    // user profile
    router.get("/api/user/profile", middleware_1.requiresUser, user_controller_1.getUserProfileHandler);
    return router;
}
exports.default = default_1;
