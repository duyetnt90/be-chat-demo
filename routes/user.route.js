import express from "express";
import * as userController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/find", userController.findByEmail);
router.get("/get-all/:userId", userController.getAllUsers);

export default router;