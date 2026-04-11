import express from "express";
import * as userController from "../controllers/user.controller.js";
import {authMiddleware} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/find", authMiddleware, userController.findByEmail);
router.get("/get-all/:userId", authMiddleware, userController.getAllUsers);
router.get("/search/:keyword", authMiddleware, userController.searchUsers);
router.get("/profile", authMiddleware, userController.getProfile);
router.put("/profile", authMiddleware, userController.updateProfile);

export default router;