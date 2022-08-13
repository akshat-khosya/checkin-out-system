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
exports.validatePasswordQuery = exports.findUserQuery = exports.createUserQuery = void 0;
const user_model_1 = __importDefault(require("../model/user.model"));
function createUserQuery(userdata) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield user_model_1.default.create(userdata);
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.createUserQuery = createUserQuery;
function findUserQuery(query) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findOne(query);
            return user;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.findUserQuery = findUserQuery;
function validatePasswordQuery(input) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield input.user.comparePassword(input.password);
    });
}
exports.validatePasswordQuery = validatePasswordQuery;
