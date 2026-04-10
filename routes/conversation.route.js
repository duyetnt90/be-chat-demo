import express from "express";
import * as conversationController from "../controllers/conversation.controller.js";

const router = express.Router();

router.post("/", conversationController.createConversation);
router.get("/:userId", conversationController.getConversations);

export default router;