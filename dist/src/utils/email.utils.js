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
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const config_1 = __importDefault(require("config"));
const google_utils_1 = __importDefault(require("./google.utils"));
const logger_1 = __importDefault(require("../logger"));
const OAuth2 = googleapis_1.google.auth.OAuth2;
function sendMail(to, subject, htmlContent) {
    return __awaiter(this, void 0, void 0, function* () {
        google_utils_1.default.setCredentials({ refresh_token: config_1.default.get("refreshToken") });
        const accessToken = yield google_utils_1.default.getAccessToken();
        const smtpTransport = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAUTH2",
                user: config_1.default.get("email"),
                clientId: config_1.default.get("googleId"),
                clientSecret: config_1.default.get("googleSecret"),
                refreshToken: config_1.default.get("refreshToken"),
                accessToken: accessToken.token
            }
        });
        const mailOptions = {
            from: config_1.default.get("email"),
            to: to,
            subject: subject,
            html: htmlContent
        };
        smtpTransport.sendMail(mailOptions, (err, info) => {
            if (err) {
                logger_1.default.error(err);
                return false;
            }
            else {
                logger_1.default.info(info);
                return true;
            }
        });
    });
}
exports.sendMail = sendMail;
