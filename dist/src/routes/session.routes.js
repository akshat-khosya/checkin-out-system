"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_controller_1 = require("../controller/session.controller");
const middleware_1 = require("../middleware");
const session_schema_1 = require("../schema/session.schema");
function default_1() {
    const router = (0, express_1.Router)();
    // create session
    router.post("/api/session/", (0, middleware_1.validateRequest)(session_schema_1.createUserSessionSchema), session_controller_1.createSessionHandler);
    // delete session
    router.delete("/api/session/", middleware_1.requiresUser, session_controller_1.deleteSessionHandler);
    return router;
}
exports.default = default_1;
