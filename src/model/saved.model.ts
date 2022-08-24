import mongoose from "mongoose";
import { UserDocument } from "./user.model";


export interface SavedDocument extends mongoose.Document {
    user: UserDocument["_id"];
    purpose: string;
    destination: string;
    type: string;
    url:string;

}

const SavedSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    url: {
        type: String
    }


},
    {
        timestamps: true
    }
);

const Saved = mongoose.model<SavedDocument>("Token", SavedSchema);
export default Saved;