import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import { initSocket } from "./sockets/index.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import messageRoutes from "./routes/message.route.js";
import conversationRoute from "./routes/conversation.route.js";
import friendRoute from "./routes/friend.routes.js";


dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL
    }
});

// middleware
const allowedOrigins = [
    "http://localhost:5173",
    "https://chat.duyetnt.com",
];

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
