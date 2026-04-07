import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation"
    },

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    content: String,

    type: {
        type: String,
        enum: ["text", "image"],
        default: "text"
    }

}, { timestamps: true });


messageSchema.index({ conversationId: 1 });

export default mongoose.model("Message", messageSchema);