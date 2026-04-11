import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) throw new Error("No token");

        const token = authHeader.split(" ")[1];

        if (!token) throw new Error("Invalid token");

        req.user = jwt.verify(token, process.env.JWT_SECRET);

        next();
    } catch (err) {
        console.log("JWT ERROR:", err.message);
        res.status(401).json({ message: "Unauthorized" });
    }
};
