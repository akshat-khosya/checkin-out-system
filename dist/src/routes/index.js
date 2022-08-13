"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const session_routes_1 = __importDefault(require("./session.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
function default_1(app) {
    // states(app);
    app.use((0, user_routes_1.default)());
    app.use((0, session_routes_1.default)());
}
exports.default = default_1;
