import * as conversationRepo from "../repositories/conversation.repository.js";

export const createConversation = async (senderId, receiverId) => {
    const existing = await conversationRepo.findByUserId(senderId);

    const isExist = existing.find((c) =>
        c.members.some((m) => m.toString() === receiverId.toString())
    );

    if (isExist) return isExist;

    return await conversationRepo.createConversation([senderId, receiverId]);
};

export const getConversations = async (userId) => {
    return conversationRepo.findByUserId(userId);
};