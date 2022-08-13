"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSessionSchema = void 0;
const yup_1 = require("yup");
exports.createUserSessionSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        email: (0, yup_1.string)()
            .email("Must be valid email")
            .required("Email is required"),
        password: (0, yup_1.string)()
            .required("Password is required")
            .min(6, "Password is too sort-should be 6 chars minium.")
            .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters ")
    }),
});
