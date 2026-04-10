import express from "express";
import * as messageController from "../controllers/message.controller.js";

const router = express.Router();

// get messages
router.get("/:conversationId", messageController.getMessages);
router.post("/", messageController.createMessage);


export default router;