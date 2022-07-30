import {Express} from "express";
import alive from "../controller/states.controller";
export default function(app:Express){
    app.get("/api/alive",alive);
}