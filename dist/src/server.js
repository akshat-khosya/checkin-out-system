"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./logger"));
const config_1 = __importDefault(require("config"));
const connect_1 = __importDefault(require("./db/connect"));
const routes_1 = __importDefault(require("./routes"));
const middleware_1 = require("./middleware");
const port = config_1.default.get("port");
const host = config_1.default.get("host");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(middleware_1.deserializeUser);
app.listen(port, host, () => {
    logger_1.default.info(`Server is listening at http://${host}:${port}`);
    (0, connect_1.default)();
    (0, routes_1.default)(app);
});
