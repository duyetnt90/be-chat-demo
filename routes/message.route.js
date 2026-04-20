import express from "express";
import * as messageController from "../controllers/message.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// get messages
router.get("/:conversationId", authMiddleware, messageController.getMessages);
router.post("/", authMiddleware, messageController.createMessage);

export default router;