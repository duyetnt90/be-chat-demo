import * as messageRepository from "../repositories/message.repository.js";

export const createMessage = async (data) => {
    return await messageRepository.createMessage(data);
};

export const getMessage = async (conversationId) => {
    return messageRepository.findMessageByConversationId(conversationId);
};