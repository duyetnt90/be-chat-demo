import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["private", "group"],
        default: "private"
    },

    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    name: String, // group name
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true });

export default mongoose.model("Conversation", conversationSchema);