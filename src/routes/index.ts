import {Express} from "express";
import states from "./states.routes";
export default function(app:Express){
    states(app);
}