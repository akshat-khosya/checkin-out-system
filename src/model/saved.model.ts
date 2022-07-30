import mongoose from "mongoose";


export interface UserDocument extends mongoose.Document {
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
        type: String,
        required: true
    }


},
    {
        timestamps: true
    }
);

const Saved = mongoose.model<UserDocument>("Token", SavedSchema);
export default Saved;