import express from "express";
import * as userController from "../controllers/user.controller.js";
import {authMiddleware} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/find", userController.findByEmail);
router.get("/get-all/:userId", userController.getAllUsers);
router.get("/search/:keyword", authMiddleware, userController.searchUsers);

export default router;