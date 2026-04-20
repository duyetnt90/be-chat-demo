import * as conversationService from "../services/conversation.service.js";
import { validateConversation, validateObjectId } from "../utils/validation.js";

export const createConversation = async (req, res) => {
    try {
        const userId = req.user.userId; // Use authenticated user
        const { receiverId } = req.body;

        // Validate input
        const validation = validateConversation({ receiverId });
        if (!validation.isValid) {
            return res.status(400).json({
                message: "Validation failed",
                errors: validation.errors
            });
        }

        // Verify receiver exists and is not the same as sender
        if (receiverId === userId) {
            return res.status(400).json({ message: "Cannot create conversation with yourself" });
        }

        const conversation = await conversationService.createConversation(
            userId,  // Use authenticated user
            receiverId
        );

        res.json(conversation);
    } catch (err) {
        console.error("Error creating conversation:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getConversations = async (req, res) => {
    try {
        const userId = req.user.userId; // Use authenticated user
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;

        // Validate pagination parameters
        if (page < 1 || limit < 1 || limit > 100) {
            return res.status(400).json({ message: "Invalid pagination parameters" });
        }

        const conversations = await conversationService.getConversations(userId, page, limit);
        const total = await conversationService.getConversationsCount(userId);

        res.json({
            data: conversations,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        console.error("Error getting conversations:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};