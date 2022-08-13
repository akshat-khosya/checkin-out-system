"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TokenSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    },
    type: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    sentTime: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});
const Token = mongoose_1.default.model("Token", TokenSchema);
exports.default = Token;
