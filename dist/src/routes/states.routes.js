"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const states_controller_1 = __importDefault(require("../controller/states.controller"));
function default_1(app) {
    app.get("/api/alive", states_controller_1.default);
}
exports.default = default_1;
