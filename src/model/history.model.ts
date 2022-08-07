import mongoose from "mongoose";


export interface UserDocument extends mongoose.Document {
    user: UserDocument["_id"];
    outgoingTime: Date;
    incomingTime: Date;
    purpose: string;
    destination: string;
    type: string;
    url: string;

}

const HistorySchema = new mongoose.Schema<UserDocument>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    outgoingTime: {
        type: Date,
        required: true
    },
    incomingTime: {
        type: Date,
        required: true,
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
    }


},
    {
        timestamps: true
    }
);

const Saved = mongoose.model<UserDocument>("Token", HistorySchema);
export default Saved;