import * as messageService from "../services/message.service.js";
import { validateMessage, validateObjectId } from "../utils/validation.js";
import Conversation from "../models/conversation.model.js";

export const createMessage = async (req, res) => {
    try {
        const userId = req.user.userId;
        const data = req.body;

        // Validate input
        const validation = validateMessage(data);
        if (!validation.isValid) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validation.errors
            });
        }

        // Verify sender is authenticated user
        if (data.senderId !== userId) {
            return res.status(403).json({ message: "Unauthorized: Sender ID mismatch" });
        }

        // Verify user is member of conversation
        const conversation = await Conversation.findById(data.conversationId);
        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        const isMember = conversation.members?.some(
            member => member.toString() === userId
        );

        if (!isMember) {
            return res.status(403).json({ message: "Unauthorized: Not a member of this conversation" });
        }

        const message = await messageService.createMessage(data);
        res.json(message);

    } catch (err) {
        console.error("Error creating message:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const userId = req.user.userId;
        const conversationId = req.params.conversationId;

        // Validate conversationId
        if (!conversationId || !validateObjectId(conversationId)) {
            return res.status(400).json({ message: "Valid conversation ID required" });
        }

        // Verify user is member of conversation
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        const isMember = conversation.members?.some(
            member => member.toString() === userId
        );

        if (!isMember) {
            return res.status(403).json({ message: "Unauthorized: Not a member of this conversation" });
        }

        const messages = await messageService.getMessage(conversationId);
        res.json(messages);

    } catch (err) {
        console.error("Error getting messages:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};