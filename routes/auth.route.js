import express from "express";
import * as authController from "../controllers/auth.controller.js";
import { createRateLimiter } from "../middleware/rateLimiter.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// Rate limiter specifically for login attempts
const loginLimiter = createRateLimiter(
    15 * 60 * 1000, // 15 minutes
    10, // 10 attempts per window (increased for development)
    "Too many login attempts, please try again later"
);

router.post("/register", authController.register);
router.post("/login", loginLimiter, authController.login);
router.get("/socket-token", authMiddleware, authController.getSocketToken);

export default router;