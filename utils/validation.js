// Simple validation utilities (can be replaced with Zod later)
import mongoose from "mongoose";

export const validateObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};

export const validateMessage = (data) => {
    const errors = [];

    if (!data.conversationId || !validateObjectId(data.conversationId)) {
        errors.push("Valid conversationId is required");
    }

    if (!data.senderId || !validateObjectId(data.senderId)) {
        errors.push("Valid senderId is required");
    }

    if (!data.content || typeof data.content !== 'string' || data.content.trim().length === 0) {
        errors.push("Message content is required");
    }

    if (data.content && data.content.length > 5000) {
        errors.push("Message content too long (max 5000 characters)");
    }

    if (data.type && !['text', 'image'].includes(data.type)) {
        errors.push("Invalid message type");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const validateConversation = (data) => {
    const errors = [];

    if (!data.receiverId || !validateObjectId(data.receiverId)) {
        errors.push("Valid receiverId is required");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};