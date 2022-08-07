import {Express} from "express";
import { createUserHandler } from "../controller/user.controller";
import { validateRequest } from "../middleware";
import { createUserSchema } from "../schema/user.schema";

export default function(app:Express){
    // create user
    app.post("/api/user/create",validateRequest(createUserSchema),createUserHandler);
    
}