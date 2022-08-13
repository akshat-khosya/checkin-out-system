"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleapis_1 = require("googleapis");
const config_1 = __importDefault(require("config"));
const OAuth2 = googleapis_1.google.auth.OAuth2;
const id = config_1.default.get("googleId");
const secret = config_1.default.get("googleSecret");
const myOAuth2Client = new OAuth2(id, secret);
exports.default = myOAuth2Client;
