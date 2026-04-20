import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: {
        type: String,
        required: true,
        index: true,
        lowercase: true  // Consistent case for searches
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },
    password: { type: String, required: true },
    avatar: String,
    content: String,

    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true
    }]

}, { timestamps: true });

// Create text index for search functionality
userSchema.index({ username: "text", name: "text" });

export default mongoose.model("User", userSchema);