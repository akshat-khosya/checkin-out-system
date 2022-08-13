"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SessionSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        unique: true,
        ref: "User"
    },
    userAgent: {
        type: String
    },
}, {
    timestamps: true
});
const Session = mongoose_1.default.model("Session", SessionSchema);
exports.default = Session;
