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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSession = exports.recreateAccessToken = exports.sessionValidation = exports.createRefreshToken = exports.createAccessToken = exports.createSession = void 0;
const session_repo_1 = require("../repo/session.repo");
const jwt_utils_1 = require("../utils/jwt.utils");
const config_1 = __importDefault(require("config"));
const user_repo_1 = require("../repo/user.repo");
const lodash_1 = __importDefault(require("lodash"));
function createSession(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const sessionCheck = yield (0, session_repo_1.findAndDeleteSessionQuery)({
            userId: input.userId,
        });
        const session = yield (0, session_repo_1.sessionCreateQuery)(input);
        return session;
    });
}
exports.createSession = createSession;
function createAccessToken(user, session) {
    const accessToken = (0, jwt_utils_1.sign)({ user: user.id, sessionId: session.id }, { expiresIn: config_1.default.get("accessTokenTtl") });
    return accessToken;
}
exports.createAccessToken = createAccessToken;
function createRefreshToken(session) {
    const refreshToken = (0, jwt_utils_1.sign)({ session: session.id }, { expiresIn: config_1.default.get("refreshTokenTtl") });
    return refreshToken;
}
exports.createRefreshToken = createRefreshToken;
function sessionValidation(decoded, userAgent) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield (0, session_repo_1.findSessionQuery)({ _id: decoded.sessionId });
        if (!session) {
            return false;
        }
        if (session.userAgent !== userAgent) {
            return false;
        }
        const user = yield (0, user_repo_1.findUserQuery)({ _id: decoded.user });
        return lodash_1.default.omit(user, "password");
    });
}
exports.sessionValidation = sessionValidation;
function recreateAccessToken(refreshToken, userAgent) {
    return __awaiter(this, void 0, void 0, function* () {
        const output = (0, jwt_utils_1.decode)(refreshToken);
        if (output.decoded) {
            const session = yield (0, session_repo_1.findSessionQuery)({ _id: output.decoded.session });
            if (!session) {
                return false;
            }
            if (session.userAgent !== userAgent) {
                return false;
            }
            const user = yield (0, user_repo_1.findUserQuery)({ _id: session.userId });
            if (!user)
                return false;
            const accessToken = createAccessToken(lodash_1.default.omit(user, "password"), session);
            return { accessToken: accessToken, user: lodash_1.default.omit(user, "password") };
        }
        return false;
    });
}
exports.recreateAccessToken = recreateAccessToken;
const deleteSession = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, session_repo_1.deleteSessionQuery)({ userId: userId });
});
exports.deleteSession = deleteSession;
