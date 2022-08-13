"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const yup_1 = require("yup");
exports.createUserSchema = (0, yup_1.object)({
    body: (0, yup_1.object)({
        name: (0, yup_1.string)().required("Name is required"),
        roll: (0, yup_1.string)().required("Roll is required")
            .min(5, "Roll must be at least 5 characters long")
            .max(5, "Roll must be at most 5 characters long"),
        phone: (0, yup_1.string)().required("Phone is required")
            .min(10, "Phone must be at least 10 characters long")
            .max(10, "Phone must be at most 10 characters long"),
    }),
});
