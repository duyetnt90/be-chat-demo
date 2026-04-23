import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "../utils/logger.js";

dotenv.config();

const getAuthToken = (req) => {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
        return authHeader.split(" ")[1];
    }

    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) return null;

    const tokenCookie = cookieHeader
        .split(";")
        .map((cookie) => cookie.trim())
        .find((cookie) => cookie.startsWith("token="));

    if (!tokenCookie) return null;
    return tokenCookie.split("=").slice(1).join("=");
};

export const authMiddleware = (req, res, next) => {
    try {
        const token = getAuthToken(req);

        if (!token) throw new Error("No token");

        req.user = jwt.verify(token, process.env.JWT_SECRET);

        next();
    } catch (err) {
        logger.error("JWT ERROR", { message: err.message, stack: err.stack });
        res.status(401).json({ message: "Unauthorized" });
    }
};
