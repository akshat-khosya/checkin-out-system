import {Express, Router} from "express";
import { createUserHandler, getUserProfileHandler } from "../controller/user.controller";
import { requiresUser, validateRequest } from "../middleware";
import { createUserSchema } from "../schema/user.schema";

export default function(){
    const router =  Router();
    // create user
    router.post("/api/user/create",validateRequest(createUserSchema),createUserHandler);

    // user profile
    router.get("/api/user/profile",requiresUser,getUserProfileHandler);

    return router;
    
}