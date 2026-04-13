import Message from "../models/message.model.js";

export const createMessage = (data) => {
    return Message.create(data);
}

export const findMessageByConversationId = (conversationId) => {
    return Message.find({
        conversationId: conversationId,
    }).sort({ createdAt: 1});
}