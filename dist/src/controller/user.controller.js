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
exports.getUserProfileHandler = exports.createUserHandler = void 0;
const logger_1 = __importDefault(require("../logger"));
const lodash_1 = __importDefault(require("lodash"));
const user_service_1 = require("../service/user.service");
const email_utils_1 = require("../utils/email.utils");
// create user - register
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // first time user is created
            const { user, otp } = yield (0, user_service_1.createUser)(req.body);
            // mail verfication when password is sent to mail
            const mailRes = yield (0, email_utils_1.sendMail)((yield user).email, "Password", `<h1>Your password is: ${otp}</h1>`);
            res.send("Please login with password sent to your mail");
        }
        catch (e) {
            // log.error(e);
            res.status(401).json(e.message);
        }
    });
}
exports.createUserHandler = createUserHandler;
// user profile -get
function getUserProfileHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(req.user);
        const user = yield (0, user_service_1.fetchUserProfile)(req.user._id);
        if (!user) {
            return res.send("No user found");
        }
        return res.send(lodash_1.default.omit(user.toJSON(), "password"));
    });
}
exports.getUserProfileHandler = getUserProfileHandler;
