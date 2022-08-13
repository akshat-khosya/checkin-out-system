import {Express} from "express";
import sessionRoutes from "./session.routes";
import states from "./states.routes";
import userRoutes from "./user.routes";
export default function(app:Express){
    // states(app);
    app.use(userRoutes());
    app.use(sessionRoutes());
}