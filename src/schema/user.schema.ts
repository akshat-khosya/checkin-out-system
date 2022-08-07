import {object,string,ref, number} from "yup";
export const createUserSchema = object({
    body:object({
        name:string().required("Name is required"),
        roll:string().required("Roll is required")
        .min(5,"Roll must be at least 5 characters long")
        .max(5,"Roll must be at most 5 characters long"),
        phone:string().required("Phone is required")
        .min(10,"Phone must be at least 10 characters long")
        .max(10,"Phone must be at most 10 characters long"),
    }),
});  