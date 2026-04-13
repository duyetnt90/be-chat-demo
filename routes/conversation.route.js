import express from "express";
import * as conversationController from "../controllers/conversation.controller.js";
import {authMiddleware} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, conversationController.createConversation);
router.get("/:userId", authMiddleware, conversationController.getConversations);

export default router;