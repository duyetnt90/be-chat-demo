import Conversation from "../models/conversation.model.js";

export const createConversation = (members) => {
    return Conversation.create({ members });
}

export const findByUserId = (userId, page = 1, limit = 20) => {
    const skip = (page - 1) * limit;
    return Conversation.find({
        members: { $in: [userId] },
    })
    .sort({ updatedAt: -1 })
    .limit(limit)
    .skip(skip)
    .populate("members", "name username avatar");
}

export const countByUserId = (userId) => {
    return Conversation.countDocuments({
        members: { $in: [userId] }
    });
}