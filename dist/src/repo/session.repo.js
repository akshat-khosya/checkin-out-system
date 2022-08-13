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
exports.findSessionQuery = exports.sessionCreateQuery = exports.deleteSessionQuery = exports.findAndDeleteSessionQuery = void 0;
const session_model_1 = __importDefault(require("../model/session.model"));
function findAndDeleteSessionQuery(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return session_model_1.default.findOneAndDelete(query);
    });
}
exports.findAndDeleteSessionQuery = findAndDeleteSessionQuery;
function deleteSessionQuery(query) {
    return __awaiter(this, void 0, void 0, function* () {
        return session_model_1.default.deleteOne(query);
    });
}
exports.deleteSessionQuery = deleteSessionQuery;
function sessionCreateQuery(input) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield session_model_1.default.create({ userId: input.userId, userAgent: input.userAgent });
    });
}
exports.sessionCreateQuery = sessionCreateQuery;
function findSessionQuery(query) {
    return __awaiter(this, void 0, void 0, function* () {
        const session = yield session_model_1.default.findOne(query);
        return session;
    });
}
exports.findSessionQuery = findSessionQuery;
