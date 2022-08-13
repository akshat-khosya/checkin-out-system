"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT,
    host: 'localhost',
    dbUri: process.env.DB_URI,
    saltWorkFactor: 10,
    accessTokenTtl: "15m",
    refreshTokenTtl: "30d",
    privateKey: process.env.PRIVATE_KEY,
    googleId: process.env.ID,
    googleSecret: process.env.SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    email: "20106@iiitu.ac.in"
};
