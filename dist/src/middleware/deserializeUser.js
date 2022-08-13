"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_utils_1 = require("../utils/jwt.utils");
const session_service_1 = require("../service/session.service");
const deserializeUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.headers["x-access-token"];
    const refreshToken = req.headers["x-refresh-token"];
    if (!accessToken) {
        return next();
    }
    const { decoded, expired } = (0, jwt_utils_1.decode)(accessToken);
    if (decoded) {
        const result = yield (0, session_service_1.sessionValidation)(decoded, req.get("user-agent") || "");
        if (!result) {
            return next();
        }
        req.user = result;
    }
    if (expired) {
        const result = yield (0, session_service_1.recreateAccessToken)(refreshToken, req.get("user-agent") || "");
        if (!result) {
            return next();
        }
        res.setHeader("x-access-token", result.accessToken);
        req.user = result.user;
        return next();
    }
    return next();
});
exports.default = deserializeUser;
