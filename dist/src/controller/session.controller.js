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
exports.deleteSessionHandler = exports.createSessionHandler = void 0;
const user_service_1 = require("../service/user.service");
const session_service_1 = require("../service/session.service");
// create session - login
function createSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // validate user
        const user = yield (0, user_service_1.validatePassword)(req.body);
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
        // create session
        const session = yield (0, session_service_1.createSession)({ userId: user.id, userAgent: req.get("user-agent") || "" });
        // create access token
        const accessToken = (0, session_service_1.createAccessToken)(user, session);
        // create refresh token
        const refreshToken = (0, session_service_1.createRefreshToken)(session);
        // send token to client
        return res.send({ refreshToken, accessToken });
    });
}
exports.createSessionHandler = createSessionHandler;
// delete session - logout
function deleteSessionHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield (0, session_service_1.deleteSession)(req.user._id);
    });
}
exports.deleteSessionHandler = deleteSessionHandler;
