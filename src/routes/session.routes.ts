import {Express} from "express";
import { createSessionHandler,deleteSessionHandler } from "../controller/session.controller";
import { requiresUser, validateRequest } from "../middleware";
import { createUserSessionSchema } from "../schema/session.schema";
export default function(app:Express){
    // create session
    app.post("/api/session/create",validateRequest(createUserSessionSchema),createSessionHandler);
    // delete session
    app.delete("/api/session/delete",requiresUser,deleteSessionHandler);
}