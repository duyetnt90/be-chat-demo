import Conversation from "../models/conversation.model.js";

export const createConversation = (members) => {
    return Conversation.create({ members });
}

export const findByUserId = (userId) => {
    return Conversation.find({
        members: { $in: [userId] },
    }).populate("members", "name username avatar");
}