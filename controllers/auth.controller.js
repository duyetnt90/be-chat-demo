import * as authService from "../services/auth.service.js";
import logger from "../utils/logger.js";

export const register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const data = await authService.login(req.body, res);
        res.json(data);
    } catch (err) {
        logger.error("Login error", { message: err.message, stack: err.stack });
        res.status(400).json({ message: err.message });
    }
};

export const getSocketToken = async (req, res) => {
    try {
        const userId = req.user.userId;
        const socketToken = await authService.generateSocketToken(userId);
        res.json({ token: socketToken });
    } catch (err) {
        res.status(500).json({ message: "Failed to generate socket token" });
    }
};