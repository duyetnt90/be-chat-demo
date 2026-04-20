import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import { initSocket } from "./sockets/index.js";
import { createRateLimiter } from "./middleware/rateLimiter.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import messageRoutes from "./routes/message.route.js";
import conversationRoute from "./routes/conversation.route.js";
import friendRoute from "./routes/friend.routes.js";


dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
    "MONGO_URI",
    "JWT_SECRET",
    "CLIENT_URL",
    "PORT"
];

const missingVars = requiredEnvVars.filter(
    varName => !process.env[varName]
);

if (missingVars.length > 0) {
    console.error(`Missing required environment variables: ${missingVars.join(", ")}`);
    process.exit(1);
}

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL
    }
});

const allowedOrigins = [
    process.env.CLIENT_URL,
    process.env.CLIENT_URL_PROD
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));

app.use(express.json());

// Rate limiters
const authLimiter = createRateLimiter(
    15 * 60 * 1000, // 15 minutes
    5, // 5 attempts per window
    "Too many login attempts, please try again later"
);

const generalLimiter = createRateLimiter(
    15 * 60 * 1000, // 15 minutes
    100 // 100 requests per window
);

// Apply rate limiting
app.use(generalLimiter);
app.use("/api/auth", authLimiter);

// routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/conversations", conversationRoute);
app.use("/api", friendRoute);
// public
app.use(express.static("public"));
app.use("public/uploads", express.static("public/uploads"));

// socket
initSocket(io);

// DB
connectDB()

// run
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

//server.listen(process.env.PORT, () => {
//    console.log(`Server running on port ${process.env.PORT}`);
//});
