"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const HistorySchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    },
    outgoingTime: {
        type: Date,
        required: true
    },
    incomingTime: {
        type: Date,
        required: true,
    },
    purpose: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    url: {
        type: String,
    }
}, {
    timestamps: true
});
const Saved = mongoose_1.default.model("Token", HistorySchema);
exports.default = Saved;