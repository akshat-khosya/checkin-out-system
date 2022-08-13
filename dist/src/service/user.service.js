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
exports.fetchUserProfile = exports.validatePassword = exports.createUser = void 0;
const otp_generator_1 = __importDefault(require("otp-generator"));
const lodash_1 = __importDefault(require("lodash"));
const user_repo_1 = require("../repo/user.repo");
function createUser(input) {
    return __awaiter(this, void 0, void 0, function* () {
        const otp = otp_generator_1.default.generate(10, { specialChars: true, lowerCaseAlphabets: true, upperCaseAlphabets: true, digits: true });
        const userdata = {
            email: `${input.roll}@iiitu.ac.in`,
            name: input.name,
            phone: input.phone,
            password: otp,
            role: "user"
        };
        return yield { user: (0, user_repo_1.createUserQuery)(userdata), otp: otp };
    });
}
exports.createUser = createUser;
function validatePassword({ email, password, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, user_repo_1.findUserQuery)({ email });
        if (!user) {
            return false;
        }
        const isValid = yield (0, user_repo_1.validatePasswordQuery)({ user, password });
        if (!isValid) {
            return false;
        }
        return lodash_1.default.omit(user, "password");
    });
}
exports.validatePassword = validatePassword;
function fetchUserProfile(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, user_repo_1.findUserQuery)({ _id: userId });
        if (user) {
            return user;
        }
        return false;
    });
}
exports.fetchUserProfile = fetchUserProfile;
