import * as messageService from "../services/message.service.js";

export const createMessage = async (req, res) => {
    try {
        const data = req.body;

        if (!data) {
            return res.status(400).json({ message: "Missing params" });
        }

        const message = await messageService.createMessage(data);

        res.json(message);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getMessages = async (req, res) => {
    try {
        const conversationId = req.params.conversationId

        const messages = await messageService.getMessage(conversationId);

        res.json(messages);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};