import * as conversationService from "../services/conversation.service.js";

export const createConversation = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;

        if (!senderId || !receiverId) {
            return res.status(400).json({ message: "Missing params" });
        }

        const conversation = await conversationService.createConversation(
            senderId,
            receiverId
        );

        res.json(conversation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getConversations = async (req, res) => {
    try {
        const { userId } = req.params;

        const conversations =
            await conversationService.getConversations(userId);

        res.json(conversations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};