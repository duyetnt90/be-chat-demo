import express from "express";
import * as friendController from "../controllers/friend.controller.js"
import {authMiddleware} from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/friends/:userId", authMiddleware, friendController.getFriends);
router.post("/friend-request", authMiddleware, friendController.sendFriendRequest);
router.put("/friend-request/:id/accept", authMiddleware, friendController.acceptFriendRequest);
router.get("/friend-request", authMiddleware, friendController.getRequests);

export default router;