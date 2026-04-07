import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) throw new Error("No token");

        req.user = jwt.verify(token, process.env.JWT_SECRET);

        next();
    } catch (err) {
        res.status(401).json({ message: "Unauthorized" });
    }
};
